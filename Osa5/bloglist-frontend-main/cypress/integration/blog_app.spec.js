describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Esteri Testeri',
        username: 'testeri',
        password: 'salasana',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    }) //beforeEach
  
    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('testeri')
        cy.get('#password').type('salasana')
        cy.get('#login-button').click()
        cy.contains('Esteri Testeri logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('vaara nimi')
        cy.get('#password').type('salis')
        cy.get('#login-button').click()
        cy.contains('Error with login request')
      })

      describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('testeri')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
            cy.contains('add a blog').click()
            cy.get('#author').type('Arttu Authori')
            cy.get('#title').type('Blogin titteli')
            cy.get('#url').type('www.urli.com')
            cy.get('#createbutton').click()
            cy.contains('Arttu Authori')
            cy.contains('Blogin titteli')
        })

        describe('When blogs exist', function() {
            beforeEach(function() {
                cy.contains('add a blog').click()
                cy.get('#author').type('Arttu Authori')
                cy.get('#title').type('Blogin titteli')
                cy.get('#url').type('www.urli.com')
                cy.get('#createbutton').click()
            })

            it('blogs can be liked', function() {
                cy.get('#toggleshowbutton').click()
                cy.get('#likebutton').click()
                cy.contains('likes 1')
            })

            it('user who added the blog can remove it', function() {
                cy.reload()
                cy.get('#toggleshowbutton').click()
                cy.get('#deletebutton').click()
                cy.contains('Arttu Authori').should('not.exist')
            })
        })
      })
    
    })



  })

