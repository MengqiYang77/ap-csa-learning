/**
 * Code Grading System
 * 
 * This module provides automated code validation and grading functionality.
 * Since full Java execution requires complex sandboxing, we use pattern matching
 * and static analysis to provide immediate feedback to students.
 */

export interface TestCase {
  id: string;
  description: string;
  check: (code: string) => boolean;
  hint: string;
}

export interface GradingResult {
  passed: boolean;
  score: number;
  totalTests: number;
  passedTests: number;
  feedback: string[];
  failedTests: { description: string; hint: string }[];
}

/**
 * Grade student code against a set of test cases
 */
export function gradeCode(code: string, testCases: TestCase[]): GradingResult {
  const results = testCases.map(test => ({
    passed: test.check(code),
    description: test.description,
    hint: test.hint,
  }));

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = testCases.length;
  const score = Math.round((passedTests / totalTests) * 100);
  const passed = passedTests === totalTests;

  const feedback: string[] = [];
  const failedTests: { description: string; hint: string }[] = [];

  if (passed) {
    feedback.push("✅ All tests passed! Excellent work!");
  } else {
    feedback.push(`⚠️ ${passedTests}/${totalTests} tests passed`);
    results.forEach(r => {
      if (r.passed) {
        feedback.push(`✓ ${r.description}`);
      } else {
        feedback.push(`✗ ${r.description}`);
        failedTests.push({ description: r.description, hint: r.hint });
      }
    });
  }

  return {
    passed,
    score,
    totalTests,
    passedTests,
    feedback,
    failedTests,
  };
}

/**
 * Common test case helpers
 */
export const TestHelpers = {
  // Check if code contains a specific pattern
  contains: (pattern: string | RegExp): ((code: string) => boolean) => {
    return (code: string) => {
      if (typeof pattern === 'string') {
        return code.includes(pattern);
      }
      return pattern.test(code);
    };
  },

  // Check if code declares a variable with specific type
  declaresVariable: (varName: string, type?: string): ((code: string) => boolean) => {
    return (code: string) => {
      if (type) {
        const regex = new RegExp(`${type}\\s+${varName}\\s*[=;]`);
        return regex.test(code);
      }
      return new RegExp(`\\b${varName}\\b`).test(code);
    };
  },

  // Check if code calls a specific method
  callsMethod: (methodName: string): ((code: string) => boolean) => {
    return (code: string) => {
      const regex = new RegExp(`${methodName}\\s*\\(`);
      return regex.test(code);
    };
  },

  // Check if code has a class declaration
  hasClass: (className: string): ((code: string) => boolean) => {
    return (code: string) => {
      const regex = new RegExp(`class\\s+${className}\\s*\\{`);
      return regex.test(code);
    };
  },

  // Check if code has a method declaration
  hasMethod: (methodName: string): ((code: string) => boolean) => {
    return (code: string) => {
      const regex = new RegExp(`\\b${methodName}\\s*\\([^)]*\\)\\s*\\{`);
      return regex.test(code);
    };
  },

  // Check if code has proper access modifier
  hasAccessModifier: (modifier: 'private' | 'public' | 'protected'): ((code: string) => boolean) => {
    return (code: string) => {
      return new RegExp(`\\b${modifier}\\b`).test(code);
    };
  },

  // Check if code creates an ArrayList
  createsArrayList: (varName?: string): ((code: string) => boolean) => {
    return (code: string) => {
      if (varName) {
        const regex = new RegExp(`ArrayList<[^>]+>\\s+${varName}\\s*=\\s*new\\s+ArrayList`);
        return regex.test(code);
      }
      return /ArrayList<[^>]+>\s+\w+\s*=\s*new\s+ArrayList/.test(code);
    };
  },

  // Check if code has import statement
  hasImport: (importPath: string): ((code: string) => boolean) => {
    return (code: string) => {
      const regex = new RegExp(`import\\s+${importPath.replace(/\./g, '\\.')}`);
      return regex.test(code);
    };
  },

  // Check minimum line count (excluding empty lines and comments)
  minLines: (count: number): ((code: string) => boolean) => {
    return (code: string) => {
      const lines = code.split('\n')
        .filter(line => line.trim() !== '' && !line.trim().startsWith('//'))
        .length;
      return lines >= count;
    };
  },
};

/**
 * Exercise-specific test suites
 */
export const ExerciseTests = {
  // Chapter 11: ArrayList Basics - Student Roster
  'arraylist-basics': [
    {
      id: 'import-arraylist',
      description: 'Imports ArrayList from java.util',
      check: TestHelpers.hasImport('java.util.ArrayList'),
      hint: 'Add: import java.util.ArrayList;',
    },
    {
      id: 'create-arraylist',
      description: 'Creates an ArrayList named "students"',
      check: TestHelpers.createsArrayList('students'),
      hint: 'Declare: ArrayList<String> students = new ArrayList<>();',
    },
    {
      id: 'add-students',
      description: 'Adds three students to the ArrayList',
      check: (code) => {
        const addCalls = (code.match(/students\.add\(/g) || []).length;
        return addCalls >= 3;
      },
      hint: 'Use students.add("name") three times',
    },
    {
      id: 'print-size',
      description: 'Prints the size of the ArrayList',
      check: TestHelpers.callsMethod('students.size'),
      hint: 'Use System.out.println(students.size());',
    },
    {
      id: 'access-element',
      description: 'Accesses an element using get()',
      check: TestHelpers.callsMethod('students.get'),
      hint: 'Use students.get(0) to access the first element',
    },
  ] as TestCase[],

  // Chapter 11: ArrayList Methods - Task Manager
  'arraylist-methods': [
    {
      id: 'add-at-index',
      description: 'Adds a task at a specific index',
      check: (code) => /tasks\.add\s*\(\s*\d+\s*,/.test(code),
      hint: 'Use tasks.add(index, "task") to insert at a position',
    },
    {
      id: 'modify-element',
      description: 'Modifies an element using set()',
      check: TestHelpers.callsMethod('tasks.set'),
      hint: 'Use tasks.set(index, "new task") to change an element',
    },
    {
      id: 'remove-element',
      description: 'Removes an element using remove()',
      check: TestHelpers.callsMethod('tasks.remove'),
      hint: 'Use tasks.remove(index) to delete an element',
    },
  ] as TestCase[],

  // Chapter 9: Array Basics
  'array-basics': [
    {
      id: 'declare-array',
      description: 'Declares an array',
      check: (code) => /\w+\[\]\s+\w+\s*=|int\s+\w+\[\]/.test(code),
      hint: 'Declare an array: int[] numbers = new int[size];',
    },
    {
      id: 'initialize-array',
      description: 'Initializes array elements',
      check: (code) => /\[\d+\]\s*=/.test(code) || /=\s*\{/.test(code),
      hint: 'Initialize: array[0] = value; or use array literal',
    },
    {
      id: 'access-array',
      description: 'Accesses array elements',
      check: (code) => /\w+\[\d+\]|\w+\[i\]/.test(code),
      hint: 'Access elements: array[index]',
    },
  ] as TestCase[],
};
