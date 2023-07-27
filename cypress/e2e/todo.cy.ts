
describe('Todo list', () => {
  
  it('should have a form', () => {
    cy.visit('http://localhost:3000')


    cy.get('input').should('have.value', '')
    cy.get('[data-test="add-btn"]').should('have.text','Add')

  })

  it('should add and delete, toggle status task', () => {
    
    cy.visit('http://localhost:3000')

    // add
    cy.get('input').type('Hello').should('have.value', 'Hello')
    cy.contains('Add').click()
    cy.get('input').should('have.value', '')
    cy.get('[data-test="title-1"]').should('have.text', 'Hello')
    
    cy.get('input').type('BaseButton').should('have.value', 'BaseButton')
    cy.contains('Add').click()
    cy.get('input').should('have.value', '')
    cy.get('[data-test="title-2"]').should('have.text', 'BaseButton')

    cy.get('input').type('BaseInput').should('have.value', 'BaseInput')
    cy.contains('Add').click()
    cy.get('input').should('have.value', '')
    cy.get('[data-test="title-3"]').should('have.text', 'BaseInput')

    // delete
    cy.get('li').should('have.length', 3)
    cy.get('[data-test="delete-1"]').click()
    cy.get('li').should('have.length', 2)

    // toggle status
    cy.get('[data-test="card-3"]').should('be.visible')
    cy.get('[data-test="done"]').should('be.visible')

    const dataTransfer = new DataTransfer()
    cy.get('[data-test="card-3"]').trigger('pointerdown', { dataTransfer })
    cy.get('[data-test="done"]').trigger('pointerover', { dataTransfer })

    cy.get('[data-test="card-2"]').trigger('pointerdown', { dataTransfer })
    cy.get('[data-test="test"]').trigger('pointerover', { dataTransfer })
    
    // delete
    cy.get('li').should('have.length', 2)
    cy.get('[data-test="delete-2"]').click()
    cy.get('li').should('have.length', 1)

    cy.get('li').should('have.length', 1)
    cy.get('[data-test="delete-3"]').click()
    cy.get('li').should('have.length', 0)

  })

})

