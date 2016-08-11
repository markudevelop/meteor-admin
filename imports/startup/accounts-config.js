const pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  pwd
]);

AccountsTemplates.configure({
  hideSignUpLink: true,
  texts: {
    title: {
      signIn: "Seekable Admin Login",
    }
  },
});
