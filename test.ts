/**
 * @description Manages creation of companies in a database using Firestore and handles
 * potential errors, providing a promise for successful company creation or an error
 * if creation fails. It supports both transactional and non-transactional updates.
 */
class A {
  /**
   * @description Creates a new company document in the Firestore database, either
   * within an existing transaction or as a standalone operation. It returns the newly
   * created company object if successful, or throws an error otherwise.
   *
   * @param {object} obj - Destructured into two properties: `transactionOrBatch` and
   * `company`. The first property has an optional value of type `WriteBatch | Transaction`,
   * while the second property is required with type `Optional<Company, "id">`.
   *
   * @param {WriteBatch | Transaction} obj.transactionOrBatch - Optional. It represents
   * either a database write batch or transaction.
   *
   * @param {Optional<Company, "id">} obj.company - Required.
   *
   * @returns {Company | Promise<Company>} A company document if creation is successful
   * or a promise that resolves to the created company document.
   */
  createCompany = ({
    transactionOrBatch,
    company,
  }: {
    transactionOrBatch?: WriteBatch | Transaction;
    company: Optional<Company, "id">;
  }): Company | Promise<Company> => {
    logger.info("creating new company");
    const companiesRef = firestore.companies();
    const companyRef = company?.id
      ? companiesRef.doc(company.id)
      : companiesRef.doc();
    const completeCompany: Company = {
      ...company,
      id: companyRef.id,
    };
    if (transactionOrBatch) {
      transactionOrBatch.create(companyRef, completeCompany);
      return completeCompany;
    }
    return companyRef
      .create(completeCompany)
      .then(() => {
        // Logs creation success and returns created data.
        logger.info(`created new company ${completeCompany.id}`);
        return completeCompany;
      })
      .catch((error: Error) => {
        // Logs an error and rethrows it.
        logger.warn(
          `failed to create new company ${completeCompany.id}. Error: ${error.message}`,
        );
        throw error;
      });
  };
}
