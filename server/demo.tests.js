import 'should'

if (Meteor.isServer) {
    let User = function(name){
        this.name = name;
    }
    describe("Checking if the user is created correctly", function(){
        it("should create the user with the correct name", function(){
            debugger
            let tom = new User("tom");
            tom.name.should.be.equal("tom");
        })
    })
}