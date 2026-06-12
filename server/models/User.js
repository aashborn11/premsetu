const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    religion: {
      type: String,
      trim: true,
      default: ""
    },
    caste: {
      type: String,
      trim: true,
      default: ""
    },
    gotra: {
      type: String,
      trim: true,
      default: ""
    },
    motherTongue: {
      type: String,
      trim: true,
      default: ""
    },
    city: {
      type: String,
      trim: true,
      default: ""
    },
    state: {
      type: String,
      trim: true,
      default: ""
    },
    education: {
      type: String,
      trim: true,
      default: ""
    },
    profession: {
      type: String,
      trim: true,
      default: ""
    },
    annualIncome: {
      type: String,
      trim: true,
      default: ""
    },
    height: {
      type: String,
      trim: true,
      default: ""
    },
    maritalStatus: {
      type: String,
      enum: ["never married", "divorced", "widowed", "awaiting divorce", ""],
      default: ""
    },
    diet: {
      type: String,
      enum: ["veg", "non-veg", "eggetarian", "vegan", ""],
      default: ""
    },
    familyType: {
      type: String,
      enum: ["nuclear", "joint", ""],
      default: ""
    },
    familyValues: {
      type: String,
      enum: ["traditional", "moderate", "liberal", ""],
      default: ""
    },
    parentsOccupation: {
      type: String,
      trim: true,
      default: ""
    },
    siblings: {
      type: String,
      trim: true,
      default: ""
    },
    manglikStatus: {
      type: String,
      enum: ["manglik", "non-manglik", "dont know", ""],
      default: ""
    },
    birthTime: {
      type: String,
      trim: true,
      default: ""
    },
    birthPlace: {
      type: String,
      trim: true,
      default: ""
    },
    bio: {
      type: String,
      maxlength: 1000,
      default: ""
    },
    profilePhoto: {
      type: String,
      default: ""
    },
    photos: {
      type: [String],
      default: []
    },
    isProfileComplete: {
      type: Boolean,
      default: false
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date,
      default: null
    },
    paymentRef: {
      type: String,
      trim: true,
      default: ""
    },
    interestedIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    interestedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.index({ gender: 1, isProfileComplete: 1, createdAt: -1 });

module.exports = mongoose.model("User", userSchema);
