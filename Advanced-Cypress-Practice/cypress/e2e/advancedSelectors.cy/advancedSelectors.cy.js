describe('Tests to practice advanced Selectors and Page Interactions', () => {

    // DONE: write a test for Form Authentication
    //      1. Visist https://the-internet.herokuapp.com/login.
    //      2. fill in form using tomsmith for the username and SuperSecretPassword! for the password
    //      3. click login button
    //      4. verify redirect to secure area and logout button is displayed
    //      5. click logout
    //      6. verify redirect back to form login page

    it('should redirect to the secure page when the form is submitted with valid data', () =>{
        cy.visit('https://the-internet.herokuapp.com/login');
        cy.get('#username').type('tomsmith');
        cy.get('#password').type('SuperSecretPassword!');
        cy.get('#login > button').click();

        cy.location('pathname').should('eq', '/secure');
        let logout = cy.get('#content > div > a');
        logout.should('be.visible').and('contain', 'Logout');
        logout.click();
        cy.location('pathname').should('eq', '/login')
    });


    // DONE: Automate the verification of the user interface change when hovering over elements.
    //      1. Go to the Hovers page at https://the-internet.herokuapp.com/hovers.
    //      2. Hover over each user's avatar.
    //      3. Verify that the user's name appears when you hover over their avatar.
    //      4. Optional: Click on the user's profile link and verify it navigates to the correct page.

    it('should display the correct username and link when hovering over the avatar', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers');

        cy.contains('.figure', 'name: user1').as('user1Figure');

        cy.get('@user1Figure').find('.figcaption').should('be.hidden');

        cy.get('@user1Figure').realHover();
        
        cy.get('@user1Figure').find('.figcaption').should('be.visible').and('contain', 'user1');
        cy.get('@user1Figure').find('a').should('have.attr', 'href', '/users/1').click();
        cy.location('pathname').should('eq', '/users/1');
        
    });

    // DONE: Write tests to interact with and verify the behavior of dynamic controls.
    //      1. Visit the Dynamic Controls page at https://the-internet.herokuapp.com/dynamic_controls.
    //      2. Automate the process of clicking the "Remove" button to remove the checkbox.
    //      3. Verify that the checkbox is indeed removed.
    //      4. Click the "Add" button and verify that the checkbox reappears.
    //      5. Enter text in the disabled input field after clicking the "Enable" button and verify it is enabled.

    it('should remove and add check-boxes', () => {
        cy.visit('https://the-internet.herokuapp.com/dynamic_controls');

        cy.get('#checkbox').as('checkbox');
        cy.get('#checkbox-example > button').as('button').click()
        .then(() => {
            cy.get('@checkbox').should('not.exist');
            cy.get('@button').click();
        }).then(() => {
            cy.get('#checkbox').should('exist');
        });
    });

    // DONE: Automate interactions with JavaScript alerts, confirms, and prompts.
    //      1. Navigate to the JavaScript Alerts page at https://the-internet.herokuapp.com/javascript_alerts.
    //      2. Click on the button to trigger a JS Alert and accept it.
    //      3. Click on the button to trigger a JS Confirm, accept it, and then verify the result message.
    //      4. Repeat step 3 but dismiss the confirm this time and verify the result message.
    //      5. Click on the button to trigger a JS Prompt, enter a custom message, and verify that the message was processed correctly.

    it('should display and accept the JS Alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.on('window:alert', (str) => {
            expect(str).to.equal('I am a JS Alert')
        })
        cy.contains('button', 'Click for JS Alert').click().then(() => {
            cy.get('#result').should('contain', 'You successfully clicked an alert')
        })
    })

    it('should display and confirm the JS Confirm alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.on('window:confirm', (str) => {
            expect(str).to.equal('I am a JS Confirm')
        })
    
        cy.contains('button', 'Click for JS Confirm').click().then(() => {
            cy.get('#result').should('contain', 'You clicked: Ok')
        })
    })

    it('should display and cancel the JS Confirm alert', () => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.on('window:confirm', (str) => {
            expect(str).to.equal('I am a JS Confirm')
            return false
        })
    
        cy.contains('button', 'Click for JS Confirm').click().then(() => {
            cy.get('#result').should('contain', 'You clicked: Cancel')
        })
    })

    it('should display the JS Prompt and process the input', () => {
        const userInput = 'This is a test.'
        let promptStub;
        
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.window().then((win) => {
            promptStub = cy.stub(win, 'prompt').returns(userInput);
        });

        cy.contains('button', 'Click for JS Prompt').click()

        cy.wrap(promptStub).should(() => {
            expect(promptStub).to.have.been.calledWith('I am a JS prompt')
        })

        cy.get('#result').should('contain', userInput)
    })

    it('should display and cancel the JS Prompt', () => {   
        let promptStub;

        cy.visit('https://the-internet.herokuapp.com/javascript_alerts')

        cy.window().then((win) => {
            promptStub = cy.stub(win, 'prompt').returns(null);
        });

        cy.contains('button', 'Click for JS Prompt').click()

        cy.wrap(promptStub).should(() => {
            expect(promptStub).to.have.been.calledWith('I am a JS prompt')
        })

        cy.get('#result').should('contain', 'You entered: null')   
    })

    // TODO: Practice automating drag-and-drop interactions.
    //      1. Go to the Drag and Drop page at https://the-internet.herokuapp.com/drag_and_drop.
    //      2. Automate dragging one box onto the other.
    //      3. Verify that the boxes have indeed swapped places.



    // TODO: Test the visibility and functionality of a floating menu.
    //      1. Visit the Floating Menu page at https://the-internet.herokuapp.com/floating_menu.
    //      2. Scroll down the page to ensure the menu is still visible.
    //      3. Click on each menu item and verify it navigates to the correct page section.


});


