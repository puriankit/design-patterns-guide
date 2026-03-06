/**
 * Prototype Pattern - Real World Example
 * Document cloning system for creating copies of documents
 * 
 * Use Case: Cloning complex objects instead of recreating them
 */

class Document {
  constructor(title, content, metadata = {}) {
    this.title = title;
    this.content = content;
    this.metadata = {
      author: metadata.author || 'Unknown',
      createdAt: metadata.createdAt || new Date(),
      tags: metadata.tags || [],
      version: metadata.version || 1,
      category: metadata.category || 'General'
    };
    this.formatting = {
      fontSize: 14,
      fontFamily: 'Arial',
      color: '#000000',
      backgroundColor: '#FFFFFF'
    };
  }
  
  /**
   * Clone the document (Prototype pattern)
   * Creates a deep copy of the document
   */
  clone() {
    // Deep clone to avoid shared references
    const clonedDoc = new Document(
      this.title,
      this.content,
      {
        author: this.metadata.author,
        createdAt: new Date(this.metadata.createdAt),
        tags: [...this.metadata.tags],
        version: this.metadata.version + 1,  // Increment version
        category: this.metadata.category
      }
    );
    
    // Clone formatting
    clonedDoc.formatting = { ...this.formatting };
    
    return clonedDoc;
  }
  
  setTitle(title) {
    this.title = title;
    return this;
  }
  
  setContent(content) {
    this.content = content;
    return this;
  }
  
  setAuthor(author) {
    this.metadata.author = author;
    return this;
  }
  
  addTag(tag) {
    this.metadata.tags.push(tag);
    return this;
  }
  
  setCategory(category) {
    this.metadata.category = category;
    return this;
  }
  
  setFormatting(formatting) {
    this.formatting = { ...this.formatting, ...formatting };
    return this;
  }
  
  getInfo() {
    return {
      title: this.title,
      content: this.content.substring(0, 50) + '...',
      metadata: this.metadata,
      formatting: this.formatting
    };
  }
  
  toString() {
    return JSON.stringify(this.getInfo(), null, 2);
  }
}

class InvoiceDocument extends Document {
  constructor(title, content, metadata, invoiceData = {}) {
    super(title, content, metadata);
    this.invoiceNumber = invoiceData.invoiceNumber || '';
    this.amount = invoiceData.amount || 0;
    this.dueDate = invoiceData.dueDate || new Date();
    this.items = invoiceData.items || [];
  }
  
  clone() {
    const clonedDoc = new InvoiceDocument(
      this.title,
      this.content,
      {
        author: this.metadata.author,
        createdAt: new Date(this.metadata.createdAt),
        tags: [...this.metadata.tags],
        version: this.metadata.version + 1,
        category: this.metadata.category
      },
      {
        invoiceNumber: this.invoiceNumber,
        amount: this.amount,
        dueDate: new Date(this.dueDate),
        items: this.items.map(item => ({ ...item }))
      }
    );
    
    clonedDoc.formatting = { ...this.formatting };
    return clonedDoc;
  }
  
  setInvoiceNumber(number) {
    this.invoiceNumber = number;
    return this;
  }
  
  setAmount(amount) {
    this.amount = amount;
    return this;
  }
  
  addItem(item) {
    this.items.push(item);
    return this;
  }
  
  getInfo() {
    return {
      ...super.getInfo(),
      invoiceNumber: this.invoiceNumber,
      amount: this.amount,
      dueDate: this.dueDate,
      itemCount: this.items.length
    };
  }
}

export default Document;
export { InvoiceDocument };
