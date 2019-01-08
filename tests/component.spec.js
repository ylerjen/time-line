const COMP_NAME = 'change-me';
describe('WebComponent '+ COMP_NAME, () => {
    let comp = null;
    //-------------------------------------------
    // PRE / POST ACTIONS
    //-------------------------------------------
    beforeEach(function() {
        // Create the component to test before each tests
        comp = document.createElement(COMP_NAME);        
    });

    describe('getter dummy', function(){
        it("should return woot", function() {            
            customElements.whenDefined(COMP_NAME).then(() => {
                expect(comp.dummy).toEqual('woot');
            });
        });        
    });
});