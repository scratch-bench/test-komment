class Oauth::AuthorizationsController < Doorkeeper::AuthorizationsController
  include Gitlab::GonHelper
  include InitializesCurrentUserMode
  include Gitlab::Utils::StrongMemoize

  before_action :add_gon_variables
  before_action :verify_confirmed_email!, :verify_admin_allowed!

  layout 'profile'

  # Overridden from Doorkeeper::AuthorizationsController to
  # include the call to session.deletb
  def new
    if pre_auth.authorizable?
      if skip_authorization? || (matching_token? && pre_auth.client.application.confidential?)
        auth = authorization.authorize
        parsed_redirect_uri = URI.parse(auth.redirect_uri)
        session.delete(:user_return_to)
        render "doorkeeper/authorizations/redirect", locals: { redirect_uri: parsed_redirect_uri }, layout: false
      else
        redirect_uri = URI(authorization.authorize.redirect_uri)
        allow_redirect_uri_form_action(redirect_uri.scheme)

        render "doorkeeper/authorizations/new"
      end
    else
      render "doorkeeper/authorizations/error"
    end
  end

  private

  # modifies a form's action URL by appending the redirect URI scheme and any additional
  # parameters to the original action URL, ensuring compliance with Content Security
  # Policy (CSP) directives.
  # 
  # @param redirect_uri_scheme [String] scheme of the redirect URI for content security
  # policy configuration.
  # 
  # @returns [Array] a new content security policy form action that includes the
  # provided redirect URI scheme.
  def allow_redirect_uri_form_action(redirect_uri_scheme = "a")
    return unless content_security_policy?

    form_action = request.content_security_policy.form_action
    return unless form_action

    form_action.push("#{redirect_uri_scheme}:")
    request.content_security_policy.form_action(*form_action)
  end

  # modifies the authentication parameters based on the action name, specifically
  # downgrading scopes for actions named "new".
  # 
  # @returns [Array] a downgraded set of scopes for the current user.
  def pre_auth_params
    # Cannot be achieved with a before_action hook, due to the execution order.
    downgrade_scopes! if action_name == 'new'

    super
  end

  # limit scopes when signing in with GitLab
  def downgrade_scopes!
    auth_type = params.delete('gl_auth_type')
    return unless auth_type == 'login'

    ensure_read_user_scope!

    params['scope'] = Gitlab::Auth::READ_USER_SCOPE.to_s if application_has_read_user_scope?
  end

  # Configure the application to support read_user scope, if it already
  # supports scopes with greater levels of privileges.
  def ensure_read_user_scope!
    return if application_has_read_user_scope?
    return unless application_has_api_scope?

    add_read_user_scope!
  end

  # adds the `Gitlab::Auth::READ_USER_SCOPE` scope to a Doorkeeper application if it
  # exists and saves the changes.
  # 
  # @returns [`doorkeeper_application`.] a successfully saved Doorkeeper application
  # with the added scope.
  # 
  # 		- `doorkeeper_application`: This is an instance of `Doorkeeper::Application`,
  # which represents the application for which the scope is being added.
  # 		- `scopes`: This is a list of `Gitlab::Auth::Scope` objects, which contain
  # information about the scopes that are being added to the application. In this case,
  # the list includes the `READ_USER_SCOPE`.
  def add_read_user_scope!
    return unless doorkeeper_application

    scopes = doorkeeper_application.scopes
    scopes.add(Gitlab::Auth::READ_USER_SCOPE)
    doorkeeper_application.scopes = scopes
    doorkeeper_application.save!
  end

  # retrieves an application from Doorkeeper's client database based on the provided
  # `client_id`.
  # 
  # @returns [Object] an instance of `Doorkeeper::OAuth::Client`.
  def doorkeeper_application
    strong_memoize(:doorkeeper_application) { ::Doorkeeper::OAuth::Client.find(params['client_id'])&.application }
  end

  # determines whether a Doorkeeper application includes the `READ_USER_SCOPE` scope.
  # 
  # @returns [`Boolean`.] a boolean value indicating whether the given application
  # includes the READ_USER scope.
  # 
  # 		- `doorkeeper_application`: This is an instance of the `Doorkeeper::Application`
  # class, which represents the current application being checked for read user scope.
  # 		- `includes_scope?`: This method checks whether the given scope is included in
  # the application's list of authorized scopes. The parameter `Gitlab::Auth::READ_USER_SCOPE`
  # represents the specific scope being checked. If the scope is included, the method
  # returns `true`, otherwise it returns `false`.
  def application_has_read_user_scope?
    doorkeeper_application&.includes_scope?(Gitlab::Auth::READ_USER_SCOPE)
  end

  # checks if a Doorkeeper application includes any API scope among the specified ones.
  # 
  # @returns [`Boolean`.] a boolean value indicating whether the given application
  # includes at least one of the specified API scopes.
  # 
  # 		- `doorkeeper_application`: A boolean value indicating whether the application
  # includes an API scope.
  # 		- `includes_scope?(*::Gitlab::Auth::API_SCOPES)`: A method that checks if the
  # application includes a specific API scope. The method takes an array of strings
  # representing the API scopes as its argument, and returns a boolean value indicating
  # whether the application includes at least one of those scopes.
  def application_has_api_scope?
    doorkeeper_application&.includes_scope?(*::Gitlab::Auth::API_SCOPES)
  end

  # verifies if the current user's email is confirmed and renders an error message if
  # it's not.
  # 
  # @returns [`Error`.] an error message indicating that the email address is not confirmed.
  # 
  # 		- `current_user&.confirmed?`: This returns `true` if the current user has confirmed
  # their email address, and `false` otherwise.
  # 		- `pre_auth`: This is an instance of `Doorkeeper::AuthenticationError`, which
  # represents an authentication error that occurs before the user reaches the
  # authorization page.
  # 		- `error`: This attribute of `pre_auth` takes on the value `:unconfirmed_email`.
  def verify_confirmed_email!
    return if current_user&.confirmed?

    pre_auth.error = :unconfirmed_email
    render "doorkeeper/authorizations/error"
  end

  # checks whether a request is allowed by an administrator and renders an appropriate
  # view if it is not.
  # 
  # @returns [`HTTP status code`.] a rendering of the "doorkeeper/authorizations/forbidden"
  # view.
  # 
  # 		- `render "doorkeeper/authorizations/forbidden"`: This is a method that renders
  # a view template named `"doorkeeper/authorizations/forbidden"`. The view template
  # displays an error message indicating that the user is not authorized to access the
  # resource.
  # 		- `disallow_connect?`: This is a method that returns a boolean value indicating
  # whether the user is disallowed from connecting to the resource. If this method
  # returns `true`, the `render` method is called to display the error message.
  def verify_admin_allowed!
    render "doorkeeper/authorizations/forbidden" if disallow_connect?
  end

  # checks if the current user is an administrator and if OAuth tokens are disabled
  # for admin scopes, and disables them if they are dangerous.
  # 
  # @returns [`Boolean`.] a boolean value indicating whether the requested OAuth token
  # can be accepted or not.
  # 
  # 		- `current_user`: The current user object.
  # 		- `&.admin?`: A method that checks whether the current user is an administrator
  # or not.
  # 		- `Gitlab::CurrentSettings.disable_admin_oauth_scopes`: A setting that determines
  # whether admin OAuth scopes are disabled.
  # 		- `dangerous_scopes?`: A method that checks whether the scopes are dangerous.
  def disallow_connect?
    # we're disabling Cop/UserAdmin as OAuth tokens don't seem to respect admin mode
    current_user&.admin? && Gitlab::CurrentSettings.disable_admin_oauth_scopes && dangerous_scopes? # rubocop:disable Cop/UserAdmin
  end

  # evaluates if a given `doorkeeper_application` includes specific scopes from GitLab's
  # API, read-only APIs, admin scopes, repository scopes, and registry scopes. If the
  # application is not trusted, it returns `true`.
  # 
  # @returns [`Boolean`.] a boolean indicating whether the given application has access
  # to sensitive scopes without being trusted.
  # 
  # 		- `doorkeeper_application`: A boolean indicating whether the application is a
  # trusted application or not.
  # 		- `includes_scope?`, `read_api_scope?`, `admin_scopes?`, `repository_scopes?`,
  # and `registry_scopes?`: These are methods that return a boolean indicating whether
  # a particular scope is included in the application's scopes or not. The methods
  # take an arbitrary number of arguments, which are the various scope names or values
  # that the method should check for inclusion.
  # 
  # 	In summary, the `dangerous_scopes?` function returns a boolean indicating whether
  # an application has any dangerous scopes (i.e., those that grant elevated privileges)
  # included in its scopes, based on a set of predefined scope names or values.
  def dangerous_scopes?
    doorkeeper_application&.includes_scope?(
      *::Gitlab::Auth::API_SCOPE, *::Gitlab::Auth::READ_API_SCOPE,
      *::Gitlab::Auth::ADMIN_SCOPES, *::Gitlab::Auth::REPOSITORY_SCOPES,
      *::Gitlab::Auth::REGISTRY_SCOPES
    ) && !doorkeeper_application&.trusted?
  end
end
