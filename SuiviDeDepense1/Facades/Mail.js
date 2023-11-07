const mailer = require('../config/mailer')
const Mail = {
    to: function(email){
        this.email = email
        return this
    },
    from : function(senderEmail){
        this.senderEmail = senderEmail
        return this
    },
    send : async function(body){
        await mailer.sendMail({
            from: this.senderEmail,
            to: this.email,
            text: body
        })
        console.log(('Sending email to' + this.email))
    }
}
module.exports = Mail