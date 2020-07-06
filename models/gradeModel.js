export default (mongoose) => {
  const schema = Mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  });

  const Grade = mongoose.model('grade', schema, 'grade');

  return Grade;
};
