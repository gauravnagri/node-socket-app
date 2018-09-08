class Users{
    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
      var user = {id,name,room};
      this.users.push(user);
      return user;
    }

    getUser(id){
        var user = this.users.filter((user)=>{
            return user.id === id;
        });
        if(user.length === 0){
            return null;
        }
        return user[0];
    }

    removeUser(id){
        var user = this.users.filter((user)=>{
            return user.id === id;
        });
        
        if(user.length > 0){
            var arr = this.users.filter((user) => {
                return user.id !== id;
            });    
            this.users = arr;
            return user[0]; 
        }     
        else
          return null;
    }

    getUsersList(room){
        var users = this.users.filter((user)=>{
          return user.room === room;
        });

        if(users.length > 0){
        var userNames = users.map((user)=>{
            return user.name;
        });
        return userNames;
        }
        else{
          return [];
        }
    }
}

module.exports = {
    Users
};