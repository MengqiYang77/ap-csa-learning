import { useState } from "react";
import { Link } from "wouter";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Grid3x3, AlertCircle, CheckCircle2, Layers } from "lucide-react";
import { toast } from "sonner";

export default function TwoDArrays() {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const handleSubmit = async (exerciseId: string, code: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCompletedExercises(prev => new Set(prev).add(exerciseId));
    toast.success("Code submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/20">
        <div className="container py-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/chapter-09">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chapter 9
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">2D Arrays (Matrices)</h1>
          <p className="text-lg text-muted-foreground">
            Master two-dimensional arrays and matrix operations
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-5xl">
        {/* Introduction */}
        <section className="mb-16">
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-primary" />
                What is a 2D Array?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                A 2D array is an <strong>array of arrays</strong> - essentially a table or grid structure. Think of it as having rows and columns, like a spreadsheet or chessboard.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <div className="font-mono text-sm mb-4">
                  <div className="text-muted-foreground mb-2">Visual representation:</div>
                  <div className="grid grid-cols-4 gap-2 max-w-xs">
                    <div className="bg-primary/20 p-2 text-center rounded">1</div>
                    <div className="bg-primary/20 p-2 text-center rounded">2</div>
                    <div className="bg-primary/20 p-2 text-center rounded">3</div>
                    <div className="bg-primary/20 p-2 text-center rounded">4</div>
                    <div className="bg-primary/20 p-2 text-center rounded">5</div>
                    <div className="bg-primary/20 p-2 text-center rounded">6</div>
                    <div className="bg-primary/20 p-2 text-center rounded">7</div>
                    <div className="bg-primary/20 p-2 text-center rounded">8</div>
                    <div className="bg-primary/20 p-2 text-center rounded">9</div>
                    <div className="bg-primary/20 p-2 text-center rounded">10</div>
                    <div className="bg-primary/20 p-2 text-center rounded">11</div>
                    <div className="bg-primary/20 p-2 text-center rounded">12</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">3 rows × 4 columns matrix</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Declaration and Initialization */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Declaration & Initialization</h2>
          
          <Tabs defaultValue="declaration" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="declaration">Declaration</TabsTrigger>
              <TabsTrigger value="initialization">Initialization</TabsTrigger>
              <TabsTrigger value="access">Accessing Elements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="declaration" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Three Ways to Declare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`// Method 1: Declare with size
int[][] matrix = new int[3][4];  // 3 rows, 4 columns
// All elements initialized to 0

// Method 2: Declare and initialize
int[][] matrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Method 3: Declare first, initialize later
int[][] matrix;
matrix = new int[3][4];`}</pre>
                  </div>
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Syntax note:</strong> <code>int[][] matrix</code> is preferred over <code>int matrix[][]</code> in modern Java style.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="initialization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Initialization Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`// Initialize all elements to a specific value
int[][] matrix = new int[3][4];
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        matrix[row][col] = 0;  // or any value
    }
}

// Initialize with row and column indices
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        matrix[row][col] = row * 10 + col;
    }
}
// Result: [[0,1,2,3], [10,11,12,13], [20,21,22,23]]

// Initialize with random values
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        matrix[row][col] = (int)(Math.random() * 100);
    }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Accessing and Modifying Elements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code-block">
                    <pre>{`int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Access element at row 1, column 2
int value = matrix[1][2];  // value = 6

// Modify element
matrix[0][0] = 99;  // First element now 99

// Get number of rows
int numRows = matrix.length;  // 3

// Get number of columns in first row
int numCols = matrix[0].length;  // 3

// Important: Each row can have different length!
int[][] jagged = {
    {1, 2},
    {3, 4, 5},
    {6}
};
// jagged[0].length = 2
// jagged[1].length = 3
// jagged[2].length = 1`}</pre>
                  </div>
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Common mistake:</strong> Don't confuse <code>matrix.length</code> (number of rows) with <code>matrix[0].length</code> (number of columns in first row)!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Traversal Patterns */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Traversal Patterns</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Row-Major Traversal
                </CardTitle>
                <CardDescription>Process row by row (most common)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`// Visit every element row by row
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();  // New line after each row
}

// Output for 3x3 matrix:
// 1 2 3
// 4 5 6
// 7 8 9`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Column-Major Traversal
                </CardTitle>
                <CardDescription>Process column by column</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="code-block text-sm">
                  <pre>{`// Visit every element column by column
for (int col = 0; col < matrix[0].length; col++) {
    for (int row = 0; row < matrix.length; row++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();  // New line after each column
}

// Output for 3x3 matrix:
// 1 4 7
// 2 5 8
// 3 6 9`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enhanced For Loop (For-Each)</CardTitle>
              <CardDescription>Simpler syntax when you don't need indices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="code-block">
                <pre>{`// For-each loop for 2D arrays
for (int[] row : matrix) {
    for (int element : row) {
        System.out.print(element + " ");
    }
    System.out.println();
}

// Limitation: Cannot modify elements!
for (int[] row : matrix) {
    for (int element : row) {
        element = 0;  // ❌ This does NOT change the array!
    }
}

// To modify, use traditional loops with indices
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        matrix[row][col] = 0;  // ✅ This works!
    }
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Common Operations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Common Matrix Operations</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sum of All Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`public static int sumMatrix(int[][] matrix) {
    int sum = 0;
    for (int row = 0; row < matrix.length; row++) {
        for (int col = 0; col < matrix[row].length; col++) {
            sum += matrix[row][col];
        }
    }
    return sum;
}

// Or using for-each:
public static int sumMatrix(int[][] matrix) {
    int sum = 0;
    for (int[] row : matrix) {
        for (int element : row) {
            sum += element;
        }
    }
    return sum;
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find Maximum Element</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`public static int findMax(int[][] matrix) {
    int max = matrix[0][0];  // Start with first element
    
    for (int row = 0; row < matrix.length; row++) {
        for (int col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] > max) {
                max = matrix[row][col];
            }
        }
    }
    
    return max;
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Row and Column Sums</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="code-block">
                  <pre>{`// Sum of a specific row
public static int rowSum(int[][] matrix, int rowIndex) {
    int sum = 0;
    for (int col = 0; col < matrix[rowIndex].length; col++) {
        sum += matrix[rowIndex][col];
    }
    return sum;
}

// Sum of a specific column
public static int colSum(int[][] matrix, int colIndex) {
    int sum = 0;
    for (int row = 0; row < matrix.length; row++) {
        sum += matrix[row][colIndex];
    }
    return sum;
}

// All row sums
public static int[] allRowSums(int[][] matrix) {
    int[] sums = new int[matrix.length];
    for (int row = 0; row < matrix.length; row++) {
        sums[row] = rowSum(matrix, row);
    }
    return sums;
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Real-World Applications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Real-World Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Image Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Digital images are 2D arrays of pixel values. Each element represents color intensity.
                </p>
                <div className="code-block text-xs">
                  <pre>{`// Invert image colors
for (int row = 0; row < image.length; row++) {
    for (int col = 0; col < image[row].length; col++) {
        image[row][col] = 255 - image[row][col];
    }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Game Boards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Chess, checkers, tic-tac-toe, and other board games use 2D arrays to represent the board state.
                </p>
                <div className="code-block text-xs">
                  <pre>{`// Tic-tac-toe board
char[][] board = {
    {'X', 'O', 'X'},
    {'O', 'X', 'O'},
    {'O', 'X', 'X'}
};`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spreadsheets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Excel and Google Sheets store data in 2D arrays. Each cell is an element.
                </p>
                <div className="code-block text-xs">
                  <pre>{`// Student grades
double[][] grades = {
    {95, 87, 92},  // Student 1
    {88, 91, 85},  // Student 2
    {92, 89, 94}   // Student 3
};`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maps & Grids</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Tile-based games, pathfinding algorithms, and geographic data use 2D arrays.
                </p>
                <div className="code-block text-xs">
                  <pre>{`// 0 = walkable, 1 = wall
int[][] map = {
    {0, 0, 1, 0},
    {0, 1, 1, 0},
    {0, 0, 0, 0}
};`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Practice Exercise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Challenge: Matrix Transpose</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Exercise: Transpose a Matrix</CardTitle>
              <CardDescription>
                Create a new matrix where rows become columns and columns become rows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2">Example:</p>
                <div className="font-mono text-sm space-y-2">
                  <div>
                    <div className="text-muted-foreground">Original:</div>
                    <div>[1, 2, 3]</div>
                    <div>[4, 5, 6]</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Transposed:</div>
                    <div>[1, 4]</div>
                    <div>[2, 5]</div>
                    <div>[3, 6]</div>
                  </div>
                </div>
              </div>

              <CodeEditor
                defaultCode={`public class MatrixOperations {
    public static int[][] transpose(int[][] matrix) {
        // TODO: Create and return the transposed matrix
        // Hint: If original is m×n, result is n×m
        // result[col][row] = matrix[row][col]
        
        
        
        return null;
    }
    
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        int[][] result = transpose(matrix);
        
        // Print result
        for (int[] row : result) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`}
                onSubmit={(code) => handleSubmit("transpose", code)}
                height="400px"
              />

              {completedExercises.has("transpose") && (
                <Alert className="bg-success/10 border-success/20">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success">
                    Great work! Your solution has been submitted.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" asChild>
            <Link href="/chapter-09/array-algorithms">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Array Algorithms
            </Link>
          </Button>
          <Button asChild>
            <Link href="/chapter-09">
              Back to Chapter 9 Overview
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
