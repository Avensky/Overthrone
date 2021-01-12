 //==============================================================================
// set up ======================================================================
//==============================================================================
const crypto    = require('crypto');
const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt    = require('bcrypt');

// define the schema for our user model
const userSchema = new mongoose.Schema({
  addresses: {
    name: {
      type          : String,
      //required      : [false, 'Please tell us your name!']
    },    
    phone: {
      type          : Number,
    },
    address1: {
      type          : String
    },    
    address2: {
      type          : String
    },
    city: {
      type          : String
    },
    state: {
      type          : String
    },
    zipCode: {
      type          : Number
    },
    email: {
      type          : String,
      //required      : [false, 'Please provide your email'],
      //unique        : true,
      lowercase     : true,
      //validate      : [validator.isEmail, 'Please provide a valid email']
    },
  },
  local: {
    email: {
      type          : String,
      required      : [false, 'Please provide your email'],
      unique        : true,
      lowercase     : true,
      validate      : [validator.isEmail, 'Please provide a valid email']
    },
    role: {
      type          : String,
      enum          : ['user', 'guide', 'lead-guide', 'admin'],
      // default       : 'user'
    },
    password: {
      type          : String,
      required      : [false, 'Please provide a password'],
      minlength     : 8,
      select        : true
    },
    passwordConfirm: {
      type          : String,
      required      : [false, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    passwordChangedAt     : Date,
    passwordResetToken    : String,
    passwordResetExpires  : Date,
    active: {
      type    : Boolean,
      // default : true,
      select  : false
    }
  },
  facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  twitter          : {
      id           : String,
      token        : String,
      displayName  : String,
      username     : String
  },
  google           : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  }
});

//  userSchema.pre('save', async function(next) {
//    // Only run this function if password was actually modified
//    if (!this.isModified('password')) return next();//  

//    // Hash the password with cost of 12
//    this.password = await bcrypt.hash(this.password, 12);// 

//    // Delete passwordConfirm field
//    this.passwordConfirm = undefined;
//    next();
//  });// 

//  userSchema.pre('save', function(next) {
//    if (!this.isModified('password') || this.isNew) return next();//  

//    this.passwordChangedAt = Date.now() - 1000;
//    next();
//  });// 

//  userSchema.pre(/^find/, function(next) {
//    // this points to the current query
//    this.find({ active: { $ne: false } });
//    next();
//  });

//==============================================================================
// methods =====================================================================
//==============================================================================

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  console.log("password check = " + password);
  console.log("local user check = " + this.local);
  console.log("local pass check = " + this.local.password);
  console.log("local email check = " + this.local.email);
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);
module.exports = User;
