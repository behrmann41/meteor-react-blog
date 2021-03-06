Posts = new Mongo.Collection( 'posts' );

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PostsSchema - new SimpleSchema({
  "published": {
    type: Boolean,
    label: "Is this post published?",
    autoValue() {
      if ( this.isInsert ){
        return false;
      }
    }
  },
  "author": {
    type: String,
    label: "The ID of the author of this post.",
    autoValue() {
      let user = Meteor.users.findOne({_id: this.userId });
      if ( user ) {
        return `${ user.profile.name.first } ${ user.profile.name.last }`;
      }
    }
  },
  "updated": {
    type: String,
    label: "The date this post was last updated on.",
    autoValue() {
      return ( new Date() ).toISOString();
    },
    "title": {
      type: String,
      label: "The title of this post.",
      defaultValue: "Untitled Post"
    },
    "content": {
      type: String,
      label: "The content of this post.",
      optional: true
    },
    "tags"; {
      type: [ String ],
      label: "the tags for this post.",
      optional: true
    }
  }
});

Posts.attachSchema( PostsSchema )
