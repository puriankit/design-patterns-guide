/**
 * ============================================================================
 * BUILDER PATTERN - User Profile Example
 * ============================================================================
 * 
 * WHAT THIS DOES:
 * Constructs complex user profile objects step-by-step using a fluent interface.
 * Instead of a constructor with 10+ parameters, you chain readable methods.
 * 
 * WHY THIS IS USEFUL:
 * - Avoid constructors with too many parameters
 * - Make code self-documenting and readable
 * - Handle optional parameters elegantly
 * - Validate complete object before creation
 * 
 * HOW IT WORKS:
 * 1. Create builder: new UserProfileBuilder()
 * 2. Chain methods: .setFirstName('John').setEmail('john@email.com')
 * 3. Call build(): .build() - creates the final object
 * 4. Get immutable user object
 * 
 * REAL-WORLD ANALOGY:
 * Like ordering a custom burger. You don't say "burger with sesame bun, beef patty,
 * cheddar cheese, lettuce, tomato, onions, pickles, ketchup, mayo" all at once.
 * You build it: "sesame bun" + "beef patty" + "cheddar" + "lettuce" etc.
 * ============================================================================
 */

/**
 * Builder Pattern - Real World Example
 * User Profile Builder for creating complex user objects
 * 
 * Use Case: Building objects with many optional parameters
 */

class UserProfile {
  constructor(builder) {
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.email = builder.email;
    this.age = builder.age;
    this.phone = builder.phone;
    this.address = builder.address;
    this.bio = builder.bio;
    this.avatar = builder.avatar;
    this.preferences = builder.preferences;
    this.socialLinks = builder.socialLinks;
    this.isVerified = builder.isVerified;
    this.accountType = builder.accountType;
  }
  
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  getInfo() {
    return {
      name: this.getFullName(),
      email: this.email,
      age: this.age,
      phone: this.phone,
      address: this.address,
      bio: this.bio,
      avatar: this.avatar,
      preferences: this.preferences,
      socialLinks: this.socialLinks,
      isVerified: this.isVerified,
      accountType: this.accountType
    };
  }
  
  toString() {
    return JSON.stringify(this.getInfo(), null, 2);
  }
}

class UserProfileBuilder {
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.age = null;
    this.phone = null;
    this.address = null;
    this.bio = '';
    this.avatar = '👤';
    this.preferences = {
      theme: 'light',
      notifications: true,
      language: 'en'
    };
    this.socialLinks = {};
    this.isVerified = false;
    this.accountType = 'free';
  }
  
  setFirstName(firstName) {
    this.firstName = firstName;
    return this;
  }
  
  setLastName(lastName) {
    this.lastName = lastName;
    return this;
  }
  
  setEmail(email) {
    this.email = email;
    return this;
  }
  
  setAge(age) {
    this.age = age;
    return this;
  }
  
  setPhone(phone) {
    this.phone = phone;
    return this;
  }
  
  setAddress(address) {
    this.address = address;
    return this;
  }
  
  setBio(bio) {
    this.bio = bio;
    return this;
  }
  
  setAvatar(avatar) {
    this.avatar = avatar;
    return this;
  }
  
  setPreferences(preferences) {
    this.preferences = { ...this.preferences, ...preferences };
    return this;
  }
  
  setSocialLinks(socialLinks) {
    this.socialLinks = { ...this.socialLinks, ...socialLinks };
    return this;
  }
  
  setVerified(isVerified) {
    this.isVerified = isVerified;
    return this;
  }
  
  setAccountType(accountType) {
    this.accountType = accountType;
    return this;
  }
  
  build() {
    if (!this.firstName || !this.email) {
      throw new Error('First name and email are required!');
    }
    return new UserProfile(this);
  }
  
  reset() {
    return new UserProfileBuilder();
  }
}

export default UserProfileBuilder;
export { UserProfile };
