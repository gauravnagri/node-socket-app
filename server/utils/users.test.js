const expect = require("expect");
const {Users} = require("./users");

describe("Users Class Test",()=>{
    var userObj;
    beforeEach(()=>{
        userObj = new Users();
        userObj.users = [{
            id : "1",
            name : "Gaurav",
            room : "React"
        },{
            id : "2",
            name : "Andrew",
            room : "Node"
        },{
            id : "3",
            name : "James",
            room : "Node"
        }];
    });
  it("should add a new user",()=>{
      var users = new Users();
      var user = {
       id : "kjbkjvui",
       name : "Gaurav",
       room : "Bazinga"
    };

    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([resUser]);
  });

   it("should get a user with valid id",()=>{
      var user = userObj.getUser("1");
      expect(user).toMatchObject({id : "1", name : "Gaurav", room : "React"});
   });

   it("should not return anything with invalid id",()=>{
    var user = userObj.getUser("400");
    expect(user).toBeFalsy();
 });
   
   it("should remove a user with valid id",()=>{
    var user = userObj.removeUser("1");
    expect(user).toMatchObject({id : "1", name : "Gaurav", room : "React"});
    expect(userObj.users.length).toBe(2);
   });

   it("should not remove a user when invalid id passed",()=>{
    var user = userObj.removeUser("400");
    expect(user).toBeFalsy();
    expect(userObj.users.length).toBe(3);
   });

   it("should return users for Node room",()=>{
    var user = userObj.getUsersList("Node");
    expect(user).toEqual(["Andrew","James"]);
   });

   it("should return users React room",()=>{
    var user = userObj.getUsersList("React");
    expect(user).toEqual(["Gaurav"]);
   });
});