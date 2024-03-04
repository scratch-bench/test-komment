class A {
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
