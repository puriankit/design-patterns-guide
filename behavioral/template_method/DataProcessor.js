/**
 * Template Method Pattern - Real World Example
 * Data processing pipeline with customizable steps
 * 
 * Use Case: Processing different types of data with same workflow
 */

// Abstract Base Class - Defines the template method
class DataProcessor {
  constructor(name) {
    this.name = name;
  }
  
  // Template Method - Defines the algorithm skeleton
  process(data) {
    const results = [];
    
    results.push(`\n🔄 Processing with ${this.name}`);
    results.push('━'.repeat(40));
    
    // Step 1: Validate (common)
    results.push('1️⃣ Validating data...');
    const validationResult = this.validate(data);
    results.push(`   ${validationResult}`);
    
    if (!validationResult.includes('✅')) {
      results.push('❌ Processing stopped due to validation error');
      return results;
    }
    
    // Step 2: Transform (customizable)
    results.push('2️⃣ Transforming data...');
    const transformed = this.transform(data);
    results.push(`   ${transformed}`);
    
    // Step 3: Process (customizable)
    results.push('3️⃣ Processing data...');
    const processed = this.processData(transformed);
    results.push(`   ${processed}`);
    
    // Step 4: Format (customizable)
    results.push('4️⃣ Formatting output...');
    const formatted = this.formatOutput(processed);
    results.push(`   ${formatted}`);
    
    // Step 5: Save (common)
    results.push('5️⃣ Saving results...');
    const saveResult = this.save(formatted);
    results.push(`   ${saveResult}`);
    
    results.push('\n✅ Processing complete!');
    return results;
  }
  
  // Common step - same for all subclasses
  validate(data) {
    if (!data || data.length === 0) {
      return '❌ Validation failed: Empty data';
    }
    return '✅ Data validated';
  }
  
  // Common step - same for all subclasses
  save(data) {
    return `💾 Saved: ${data.substring(0, 30)}...`;
  }
  
  // Abstract methods - must be implemented by subclasses
  transform(data) {
    throw new Error('transform() must be implemented');
  }
  
  processData(data) {
    throw new Error('processData() must be implemented');
  }
  
  formatOutput(data) {
    throw new Error('formatOutput() must be implemented');
  }
}

// Concrete Implementation 1: CSV Processor
class CSVProcessor extends DataProcessor {
  constructor() {
    super('CSV Processor');
  }
  
  transform(data) {
    return `Converted to CSV format: ${data.split(' ').join(',')}`;
  }
  
  processData(data) {
    return `Processed CSV: ${data.toUpperCase()}`;
  }
  
  formatOutput(data) {
    return `CSV Output: [${data}]`;
  }
}

// Concrete Implementation 2: JSON Processor
class JSONProcessor extends DataProcessor {
  constructor() {
    super('JSON Processor');
  }
  
  transform(data) {
    const obj = { data: data, timestamp: new Date().toISOString() };
    return JSON.stringify(obj);
  }
  
  processData(data) {
    const parsed = JSON.parse(data);
    parsed.processed = true;
    return JSON.stringify(parsed);
  }
  
  formatOutput(data) {
    return `JSON Output: ${data}`;
  }
}

// Concrete Implementation 3: XML Processor
class XMLProcessor extends DataProcessor {
  constructor() {
    super('XML Processor');
  }
  
  transform(data) {
    return `<data>${data}</data>`;
  }
  
  processData(data) {
    return data.replace('<data>', '<data processed="true">');
  }
  
  formatOutput(data) {
    return `XML Output: <?xml version="1.0"?>${data}`;
  }
}

// Concrete Implementation 4: Markdown Processor
class MarkdownProcessor extends DataProcessor {
  constructor() {
    super('Markdown Processor');
  }
  
  transform(data) {
    return `# ${data}`;
  }
  
  processData(data) {
    return data + '\n\n**Processed by Markdown Processor**';
  }
  
  formatOutput(data) {
    return `Markdown Output:\n${data}`;
  }
}

// Template Method with Hooks
class DataProcessorWithHooks extends DataProcessor {
  constructor(name) {
    super(name);
  }
  
  // Template method with hooks
  process(data) {
    const results = [];
    
    results.push(`\n🔄 Processing with ${this.name}`);
    results.push('━'.repeat(40));
    
    // Hook: Pre-processing (optional)
    if (this.shouldPreProcess()) {
      results.push('🪝 Pre-processing hook...');
      results.push(`   ${this.preProcess(data)}`);
    }
    
    // Main processing
    results.push('1️⃣ Validating data...');
    results.push(`   ${this.validate(data)}`);
    
    results.push('2️⃣ Transforming data...');
    const transformed = this.transform(data);
    results.push(`   ${transformed}`);
    
    results.push('3️⃣ Processing data...');
    const processed = this.processData(transformed);
    results.push(`   ${processed}`);
    
    // Hook: Post-processing (optional)
    if (this.shouldPostProcess()) {
      results.push('🪝 Post-processing hook...');
      results.push(`   ${this.postProcess(processed)}`);
    }
    
    results.push('4️⃣ Formatting output...');
    const formatted = this.formatOutput(processed);
    results.push(`   ${formatted}`);
    
    results.push('5️⃣ Saving results...');
    results.push(`   ${this.save(formatted)}`);
    
    results.push('\n✅ Processing complete!');
    return results;
  }
  
  // Hooks - optional methods with default implementation
  shouldPreProcess() {
    return false;
  }
  
  preProcess(data) {
    return 'Pre-processing...';
  }
  
  shouldPostProcess() {
    return false;
  }
  
  postProcess(data) {
    return 'Post-processing...';
  }
}

export default DataProcessor;
export {
  CSVProcessor,
  JSONProcessor,
  XMLProcessor,
  MarkdownProcessor,
  DataProcessorWithHooks
};
