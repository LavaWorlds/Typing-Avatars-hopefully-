// Import necessary libraries
const { Plugin } = require('vendetta');
const { findByProps, after } = require('vendetta/patcher');

// Create the plugin
module.exports = new Plugin({
  manifest: require('./manifest.json'),
  name: 'Typing Avatars',
  description: 'Replaces the typing indicator with the avatars of those who are typing.',
  onLoad: async () => {
    // Find the typing-related module
    const typingModule = findByProps('startTyping');

    // Patch the startTyping function to include avatar logic
    after('startTyping', typingModule, ([channelId, userId]) => {
      // Fetch the user object dynamically
      const user = findByProps('getUser').getUser(userId);
      const avatarURL = user?.getAvatarURL();
      const username = user?.username;

      // Display avatar next to the typing indicator
      console.log(`User ${username} is typing with avatar: ${avatarURL}`);

      // Logic to visually integrate the avatar and typing indicator goes here
      // (Customize your UI to display avatars if needed)
    });
  },
  onUnload: () => {
    // Automatically clean up patches when the plugin is unloaded
    findByProps('startTyping')?.startTyping.unpatch();
  },
});