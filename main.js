var app = new Vue({
    el: '#app',
    data: {
      messages: [],
      // the enter bar where you type stuff and press enter to the global chat 
      newMessage:"",
      unsavedUsername:"",
      username:"",
    },
    created: function(){
      db.collection("message")
      .orderBy('date', 'asc')
      .onSnapshot(messagesCollection => {
        messagesCollection.forEach(messageItem => {
          this.message.push(messageItem.data());
        })
      })
    },
    methods: {
      logout: function(){
        this.username = ''
      },
      saveUsername: function(){
        this.username = this.unsavedUsername;
      },
      resetMessageInput: function(){
        this.newMessage = '';
      }, 

      enterNewMessage: function(){
        const newMessage = {
          message: this.newMessage,
          date: new Date(),
          username: this.username,
          }

        // accessing everything in messages and newMessage
        // pushing what is in newMessage to the messages 
        this.messages.push(newMessage);

        this.addToFirestore(newMessage);
         // clearing put the input enter space place where you type your messages
        this.newMessage ="";
      },
      addToFirestore: function(newMessage){
        db.collection('messages')
          .add(newMessage)
          .then(function(documentId){
            console.log("Document has been inserted", documentId);
          })
          .catch(function(error){
            console.log(error);
          })
      }
    }
  })