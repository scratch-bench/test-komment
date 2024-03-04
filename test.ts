class A {
  /**
   * @description creates a new company in Firestore. It either takes an existing company
   * object or a WriteBatch object and creates the company in Firestore.
   * 
   * @param { WriteBatch | Transaction } .transactionOrBatch - WriteBatch or Transaction
   * object that is used to create the new company in Firestore, allowing for efficient
   * batching of multiple operations in a single call.
   * 
   * @param { Optional<Company, 'id'> } .company - optional Company object or ID that
   * is used to create a new company document in Firestore when the `transactionOrBatch`
   * input is not provided, or to update an existing company document when it is provided.
   * 
   * @returns { Company | Promise<Company> } a `Company` object representing the newly
   * created company, or a promise that resolves to such an object.
   */
  createCompany = ({
    transactionOrBatch,
    company,
   }: {
    transactionOrBatch?: WriteBatch | Transaction
    company: Optional<Company, 'id'>
   }): Company | Promise<Company> => {
     logger.info('creating new company')
    const companiesRef = firestore.companies()
    const companyRef = company?.id ? companiesRef.doc(company.id) : companiesRef.doc()
    const completeCompany: Company = {
     ...company,
     id: companyRef.id,
    }
    if (transactionOrBatch) {
     transactionOrBatch.create(companyRef, completeCompany)
     return completeCompany
    }
    return companyRef
     .create(completeCompany)
     .then(() => {
       logger.info(`created new company ${completeCompany.id}`)
      return completeCompany
     })
     .catch((error: Error) => {
      logger.warn(`failed to create new company ${completeCompany.id}. Error: ${error.message}`)
      throw error
     })
 }
}
