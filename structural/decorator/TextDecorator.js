/**
 * Decorator Pattern - Real World Example
 * Text formatting decorators for React Native
 * 
 * Use Case: Adding formatting features to text dynamically
 */

// Base Component
class TextComponent {
  constructor(text) {
    this.text = text;
  }
  
  render() {
    return this.text;
  }
  
  getDescription() {
    return 'Plain text';
  }
  
  getCost() {
    return 0; // Base cost
  }
}

// Base Decorator
class TextDecorator extends TextComponent {
  constructor(textComponent) {
    super(textComponent.text);
    this.wrappedComponent = textComponent;
  }
  
  render() {
    return this.wrappedComponent.render();
  }
  
  getDescription() {
    return this.wrappedComponent.getDescription();
  }
  
  getCost() {
    return this.wrappedComponent.getCost();
  }
}

// Concrete Decorators
class BoldDecorator extends TextDecorator {
  render() {
    return `**${this.wrappedComponent.render()}**`;
  }
  
  getDescription() {
    return `${this.wrappedComponent.getDescription()} + Bold`;
  }
  
  getCost() {
    return this.wrappedComponent.getCost() + 1;
  }
}

class ItalicDecorator extends TextDecorator {
  render() {
    return `*${this.wrappedComponent.render()}*`;
  }
  
  getDescription() {
    return `${this.wrappedComponent.getDescription()} + Italic`;
  }
  
  getCost() {
    return this.wrappedComponent.getCost() + 1;
  }
}

class UnderlineDecorator extends TextDecorator {
  render() {
    return `_${this.wrappedComponent.render()}_`;
  }
  
  getDescription() {
    return `${this.wrappedComponent.getDescription()} + Underline`;
  }
  
  getCost() {
    return this.wrappedComponent.getCost() + 1;
  }
}

class ColorDecorator extends TextDecorator {
  constructor(textComponent, color) {
    super(textComponent);
    this.color = color;
  }
  
  render() {
    return `[${this.color}]${this.wrappedComponent.render()}[/${this.color}]`;
  }
  
  getDescription() {
    return `${this.wrappedComponent.getDescription()} + Color(${this.color})`;
  }
  
  getCost() {
    return this.wrappedComponent.getCost() + 2;
  }
}

class UppercaseDecorator extends TextDecorator {
  render() {
    return this.wrappedComponent.render().toUpperCase();
  }
  
  getDescription() {
    return `${this.wrappedComponent.getDescription()} + Uppercase`;
  }
  
  getCost() {
    return this.wrappedComponent.getCost() + 0.5;
  }
}

class EmojiDecorator extends TextDecorator {
  constructor(textComponent, emoji) {
    super(textComponent);
    this.emoji = emoji;
  }
  
  render() {
    return `${this.emoji} ${this.wrappedComponent.render()} ${this.emoji}`;
  }
  
  getDescription() {
    return `${this.wrappedComponent.getDescription()} + Emoji(${this.emoji})`;
  }
  
  getCost() {
    return this.wrappedComponent.getCost() + 0.5;
  }
}

export {
  TextComponent,
  BoldDecorator,
  ItalicDecorator,
  UnderlineDecorator,
  ColorDecorator,
  UppercaseDecorator,
  EmojiDecorator
};
