// parameterized login function to be initialized from setup.js
// with the config
Meteor.addLCSLogin = function(config){
  const getLCSToken = function(username, password){
    const LCSResponse = HTTP.call("POST", config.URL+"/authorize", {
      data: {
	email: username,
	password: password
      }
    });
    if(LCSResponse.data.statusCode !== 200){
      return null;
    }
    const responseBody = LCSResponse.data.body;
    return JSON.parse(responseBody).auth.token;
  }
  const isLCSMentor = function(email, token){
    const response = HTTP.call("POST", config.URL+"/read", {
      data: {
	email: email,
	token: token,
	//looking for a user document with our email will give
	//us the entire user's document
	query: {email: email}
      }
    });
    if(response.data.statusCode !== 200){
      return false;
    }
    const userData=response.data.body[0];
    return userData.role.mentor
  }
  const LCSLoginCheck = function(username, password){
    check(username, String);
    check(password, String);
    const LCSToken = getLCSToken(username, password)
    const userInDB = Meteor.users.findOne({username: username});
    
    // TODO test pasword change by mocking lcs enpoint
    if(!userInDB && !LCSToken){
      return false;
    }else if(!userInDB && LCSToken){
      //it is important to add email an username because
      //if there is no email attached to a user, then when the
      //client tries to use Meteor.loginWithPassword
      //it will see that you're trying to use an email (because it has an @)
      //and it will fail because no user has that email
      Accounts.createUser({
	username: username,
	password: password,
	email: username,
	profile: {
	  name: username,
	  mentor: isLCSMentor(username, LCSToken)
	}
      });
    }else if(userInDB && LCSToken){
      const isMentor=isLCSMentor(username, LCSToken);
      Meteor.users.update({_id: userInDB._id},
			  {"$set":{"profile.mentor":isMentor}},
			  {multi: false});
      Accounts.setPassword(userInDB._id, password);
    }
    return true;
  }
  Meteor.methods({
    LCSLoginCheck: LCSLoginCheck
  });
  return {
    getLCSToken: getLCSToken,
    isLCSMentor: isLCSMentor,
    LCSLoginCheck: LCSLoginCheck
  };
}
