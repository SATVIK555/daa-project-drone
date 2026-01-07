/* 
   ORBITAL NEXUS - CORE BEHAVIOR
   Handles scroll animations, parallax effects, and UI interactions.
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL ANIMATIONS
    // Uses IntersectionObserver to trigger animations when elements enter viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. PARALLAX EFFECT
    // Subtle background movement on scroll
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        parallaxBgs.forEach(bg => {
            // Move background slower than foreground using translation
            // Only apply if visible to save performance
            let speed = 0.3;
            // Depending on section offset, we might want different logic,
            // but a simple global translation works for sticky/fixed feels
            // Since .parallax-bg is absolute in relative container, we need to adjust logic:
            // Actually, simplest is to translate Y based on parent position relative to viewport

            let rect = bg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bg.style.transform = `translateY(${scrollY * speed}px)`;
            }
        });
    });

    // 3. SMOOTH SCROLL FOR NAV
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. CODE SYNTAX HIGHLIGHTING (Simple manual logic if needed, or just cosmetic from CSS)
    // The CSS mainly handles the look.
});

/* === ALGORITHM DETAILS MODAL LOGIC === */

const ALGO_DETAILS = {
    1: `
        <div class="modal-algo-block">
            <h2 class="modal-algo-title">1. DIJKSTRA’S ALGORITHM (Shortest Path)</h2>
            <div class="modal-text">
                <strong>Use in War Space:</strong> Finds the shortest and safest path for a drone using satellite distance data.
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Initialize distance of source drone as 0 and others as infinity.</li>
                <li>Insert source node into priority queue.</li>
                <li>Select node with minimum distance.</li>
                <li>Relax all adjacent edges.</li>
                <li>Update distances if shorter path found.</li>
                <li>Repeat until all nodes are processed.</li>
            </ol>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input
Nodes: 0,1,2,3
Edges: 0→1 (4), 0→2 (2), 2→1 (1), 1→3 (5), 2→3 (8)
Source = 0
 
Output
Shortest distances:
0 → 0
1 → 3
2 → 2
3 → 8
            </div>
            <div class="modal-img-container">
                <img src="assets/dijkstra_input.png" class="modal-img" alt="Dijkstra Input">
                <img src="assets/dijkstra_output.png" class="modal-img" alt="Dijkstra Output">
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">2. BELLMAN–FORD ALGORITHM</h2>
            <div class="modal-text">
                <strong>Use in War Space:</strong> Handles negative weights (risk zones, weather penalties).
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Initialize distances from source.</li>
                <li>Relax all edges V−1 times.</li>
                <li>Check for negative cycles.</li>
                <li>Output shortest distances.</li>
            </ol>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input
Edges: 0→1 (5), 0→2 (4), 1→2 (-2), 2→3 (3)
Source = 0

Output
Shortest distances:
0 → 0
1 → 5
2 → 3
3 → 6
            </div>
            <div class="modal-img-container">
                <img src="assets/bellman_input.png" class="modal-img" alt="Bellman-Ford Input">
                <img src="assets/bellman_output.png" class="modal-img" alt="Bellman-Ford Output">
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">3. FLOYD–WARSHALL ALGORITHM</h2>
            <div class="modal-text">
                <strong>Use in War Space:</strong> Used for strategic planning – shortest paths between all drone pairs.
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Create distance matrix.</li>
                <li>Initialize direct edge weights.</li>
                <li>For each intermediate node k: Update dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).</li>
                <li>Final matrix gives all-pairs shortest paths.</li>
            </ol>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input (Matrix)
   0   1   2
0  0   4   ∞
1  ∞   0   3
2  2   ∞   0

Output
Shortest Path Matrix:
0 4 7
5 0 3
2 6 0
            </div>
            <div class="modal-img-container">
                <img src="assets/floyd_warshall.png" class="modal-img" alt="Floyd-Warshall">
            </div>
        </div>
    `,
    2: `
        <div class="modal-algo-block">
            <h2 class="modal-algo-title">🌐 Merge Sort in Drone–Satellite Warspace</h2>
            <div class="modal-text">
                <strong>Goal:</strong> Efficiently organize satellite/drone data (distance, threat level, fuel cost) in minimum time for fast decision-making.<br>
                <strong>Topic:</strong> Satellite-Based Drone Data Organization
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Divide the array into two halves.</li>
                <li>Recursively apply Merge Sort on the left half.</li>
                <li>Recursively apply Merge Sort on the right half.</li>
                <li>Merge the two sorted halves into one sorted array.</li>
                <li>Repeat until the entire array is sorted.</li>
            </ol>
            <h3 class="modal-section-title">Real-Life Warspace Example</h3>
            <div class="modal-text">
                <strong>Satellite Task:</strong> Collects raw drone data (distance, fuel, risk level). Sends unsorted data to the control center.<br>
                <strong>Drone Command Center:</strong> Sorts drone priorities efficiently. Enables fast response and optimized mission planning.<br>
                <strong>Use Case:</strong> Sorting drone distances from satellite data to decide the nearest drone for mission execution.
            </div>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Drone Distance Data (Unsorted):
38, 27, 43, 3, 9, 82, 10

Steps Followed (Merge Sort):
Divide Phase:
[38, 27, 43, 3, 9, 82, 10]
→ [38, 27, 43, 3] [9, 82, 10]
→ [38] [27] [43] [3] [9] [82] [10]

Merge Phase:
[38] + [27] → [27, 38]
[43] + [3] → [3, 43]
[9] + [82] → [9, 82]
[27, 38] + [3, 43] → [3, 27, 38, 43]
[9, 82] + [10] → [9, 10, 82]

Final Merge:
[3, 27, 38, 43] + [9, 10, 82]
→ [3, 9, 10, 27, 38, 43, 82]

Output:
Sorted Drone Distance Data:
3, 9, 10, 27, 38, 43, 82
            </div>
            <div class="modal-img-container">
                <img src="assets/merge_sort_new.png" class="modal-img" alt="Merge Sort Visualization">
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">🔹 Quick Sort Algorithm</h2>
            <div class="modal-text">
                <strong>Topic:</strong> Satellite Data Sorting for Drone Mission Priority<br>
                <strong>Definition:</strong> Quick Sort is a Divide and Conquer algorithm that: Selects a pivot, Partitions smaller elements to the left, Partitions larger elements to the right, Recursively sorts sub-arrays.
            </div>
            <h3 class="modal-section-title">Algorithm</h3>
            <div class="modal-code-block">
QUICK-SORT(A, low, high)
If low < high:
  p = PARTITION(A, low, high)
  QUICK-SORT(A, low, p − 1)
  QUICK-SORT(A, p + 1, high)

PARTITION(A, low, high):
pivot = A[high]
i = low − 1
For j = low to high − 1:
  If A[j] ≤ pivot:
    i = i + 1
    swap A[i] and A[j]
swap A[i + 1] and A[high]
return i + 1
            </div>
            <h3 class="modal-section-title">Real-Life Warspace Example</h3>
            <div class="modal-text">
                <strong>Satellite:</strong> Collects threat levels, fuel costs, mission priorities.<br>
                <strong>Drone:</strong> Sorts missions quickly to handle high-priority targets first.
            </div>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Mission Priority Values:
[20, 2, 7, 12, 15, 1, 6, 8]

Partition Rounds (Pivot = 8):
2 7 1 6 8 20 12 15
2 1 6 7 8 20 12 15
1 2 6 7 8 20 12 15
1 2 6 7 8 12 15 20

Output:
Sorted Mission Priority:
[1, 2, 6, 7, 8, 12, 15, 20]
            </div>
            <div class="modal-img-container">
                <img src="assets/quick_sort_new.png" class="modal-img" alt="Quick Sort Visualization">
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">🔹 Heap Sort Algorithm</h2>
            <div class="modal-text">
                <strong>Topic:</strong> Satellite-Based Drone Mission Priority Scheduling<br>
                <strong>Definition:</strong> Heap Sort uses a Binary Heap to: Build a Max Heap, Extract the maximum element, Maintain heap property using heapify.
            </div>
            <h3 class="modal-section-title">Algorithm</h3>
            <div class="modal-code-block">
HEAP-SORT(A)
1. BUILD-MAX-HEAP(A)
2. For i = n − 1 down to 1:
   Swap A[0] with A[i]
   Reduce heap size
   MAX-HEAPIFY(A, 0)
            </div>
            <h3 class="modal-section-title">Real-Life Warspace Example</h3>
            <div class="modal-text">
                <strong>Satellite:</strong> Collects mission priorities and threat levels.<br>
                <strong>Drone Control:</strong> Always executes the highest-priority mission first.<br>
                <strong>Use Case:</strong> Mission scheduling where highest threat targets must be handled immediately.
            </div>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Satellite Mission Priority Array:
[17, 3, 2, 1, 100, 7, 19, 36, 25]

Output:
Sorted Mission Priority Array (Ascending Order)
            </div>
            <div class="modal-img-container">
                <img src="assets/heap_sort_new_1.png" class="modal-img" alt="Heap Sort Step 1">
                <img src="assets/heap_sort_new_2.png" class="modal-img" alt="Heap Sort Step 2" style="margin-top:10px;">
                <img src="assets/heap_sort_new_3.png" class="modal-img" alt="Heap Sort Step 3" style="margin-top:10px;">
            </div>
        </div>
    `,
    3: `
        <div class="modal-algo-block">
            <h2 class="modal-algo-title">7. Kruskal’s Algorithm (MST)</h2>
            <div class="modal-text">
                <strong>Topic:</strong> Satellite-Based Drone Network Construction
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Sort all edges in ascending order of cost.</li>
                <li>Initialize MST = ∅.</li>
                <li>For each edge (u, v):
                   <br>&nbsp;&nbsp;a. If u and v are in different sets:
                   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add (u, v) to MST.
                   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Union(u, v).</li>
                <li>Stop when MST contains |V| − 1 edges.</li>
                <li>Output MST.</li>
            </ol>
            <h3 class="modal-section-title">Real-Life Warspace Example</h3>
            <div class="modal-text">
                <strong>Satellite:</strong> Identifies communication links between drone bases. Assigns cost based on distance and threat.<br>
                <strong>Drone Network:</strong> Chooses lowest-cost links first. Avoids redundant loops.
            </div>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Drone Bases: A, B, C, D, E, F
Edges with Cost:
A–B(2), A–C(4), B–C(1), B–D(7),
C–D(3), C–E(6), D–E(2), D–F(5), E–F(4)

Output:
Selected MST Edges:
B–C(1), A–B(2), D–E(2), C–D(3), E–F(4)
Minimum Cost = 12
            </div>
             <div class="modal-img-container">
                <img src="assets/kruskal_network.png" class="modal-img" alt="Kruskal Network">
                <img src="assets/kruskal_mst_cost.png" class="modal-img" alt="Kruskal MST Cost" style="margin-top:10px;">
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">8. Prim’s Algorithm (MST)</h2>
            <div class="modal-text">
                <strong>Topic:</strong> Incremental Drone Expansion from Base Station
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Start with a single node S.</li>
                <li>Mark S as visited.</li>
                <li>Repeatedly select the minimum-cost edge connecting visited to unvisited nodes.</li>
                <li>Add the edge and mark node visited.</li>
                <li>Output MST.</li>
            </ol>
             <h3 class="modal-section-title">Real-Life Example</h3>
            <div class="modal-text">
                <strong>Satellite:</strong> Chooses a main drone base. Gradually expands control region.
            </div>
             <div class="modal-code-block">
Input:
Vertices: A, B, C, D, E
Edges:
A–B(2), A–C(3), B–C(1), B–D(4),
C–D(5), C–E(6), D–E(2)
Start Node: A

Output:
MST Edges:
A–B, B–C, B–D, D–E
Total Cost = 9
            </div>
             <div class="modal-img-container">
                <img src="assets/prim_network.png" class="modal-img" alt="Prim Network">
                <img src="assets/prim_mst_path.png" class="modal-img" alt="Prim MST Path" style="margin-top:10px;">
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">9. BFS (Breadth First Search)</h2>
            <div class="modal-text">
                <strong>Purpose:</strong> Level-wise warspace scanning.
            </div>
             <h3 class="modal-section-title">Algorithm (Exam Format)</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Create queue Q.</li>
                <li>Mark all nodes unvisited.</li>
                <li>Enqueue source S and mark visited.</li>
                <li>While Q not empty:
                   <br>&nbsp;&nbsp;a. Dequeue node u.
                   <br>&nbsp;&nbsp;b. Visit u.
                   <br>&nbsp;&nbsp;c. Enqueue unvisited neighbors.</li>
            </ol>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Graph Nodes: 0,1,2,3,4,5
Edges:
0→1,2; 1→3,4; 2→5
Source = 0

Output:
BFS Traversal:
0 1 2 3 4 5
            </div>
            <div class="modal-img-container">
                <img src="assets/bfs_v4.png" class="modal-img" alt="BFS Traversal Visualization">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px;">Figure: BFS level-wise traversal output in warspace graph</p>
            </div>
            <div class="modal-text">
                <strong>Real-Life Meaning:</strong> Satellite scans nearest zones first. Drones move layer by layer.
            </div>
        </div>

        <div class="modal-algo-block">
             <h2 class="modal-algo-title">10. DFS (Depth First Search)</h2>
             <div class="modal-text">
                <strong>Purpose:</strong> Deep reconnaissance path exploration.
            </div>
            <h3 class="modal-section-title">Algorithm (Exam Format)</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>Mark all nodes unvisited.</li>
                <li>Call DFS(S).</li>
                <li>Visit node, then recursively visit neighbors.</li>
            </ol>
             <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Same graph as BFS.
Source = 0

Output:
DFS Traversal:
0 1 3 4 2 5
            </div>
            <div class="modal-img-container">
                <img src="assets/dfs_v4_1.png" class="modal-img" alt="DFS Deep Path Traversal">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px; margin-bottom: 15px;">Figure: DFS deep traversal path exploration</p>

                <img src="assets/dfs_v4_2.png" class="modal-img" alt="DFS Backtracking Visualization" style="margin-top:10px;">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px;">Figure: DFS backtracking and alternate path traversal</p>
            </div>
            <div class="modal-text">
                <strong>Real-Life Meaning:</strong> Drone explores deeply before backtracking.
            </div>
        </div>
    `,
    4: `
        <div class="modal-algo-block">
            <h2 class="modal-algo-title">1. Binary Search Algorithm</h2>
            <div class="modal-text">
                <strong>Topic:</strong> Fast Target Lookup Using Satellite Intelligence
            </div>
            <h3 class="modal-section-title">Algorithm Steps</h3>
            <ol class="modal-text" style="padding-left: 20px;">
                <li>low = 0, high = n−1</li>
                <li>While low ≤ high:
                   <br>&nbsp;&nbsp;mid = (low + high)/2
                   <br>&nbsp;&nbsp;Compare key with A[mid]</li>
                <li>Return index or −1</li>
            </ol>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Sorted Drone IDs:
[101, 104, 108, 112, 117, 120]
Target = 112

Output:
Drone found at index 3
            </div>
            <div class="modal-img-container">
                <img src="assets/bs_step_0.png" class="modal-img" alt="Figure: Initial Sorted Array" style="display:block; margin: 10px auto; max-width: 100%;">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px; margin-bottom: 15px;">Figure: Initial Sorted Array</p>
                
                <img src="assets/bs_step_1.png" class="modal-img" alt="Figure: Step 1 - Identifying Start, Middle, and End" style="display:block; margin: 10px auto; max-width: 100%;">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px; margin-bottom: 15px;">Figure: Step 1 - Identifying Start, Middle, and End</p>
                
                <img src="assets/bs_step_2.png" class="modal-img" alt="Figure: Step 2 - Discarding Left Half" style="display:block; margin: 10px auto; max-width: 100%;">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px; margin-bottom: 15px;">Figure: Step 2 - Discarding Left Half & Narrowing Range</p>
                
                <img src="assets/bs_step_3.png" class="modal-img" alt="Figure: Step 3 - Target Found at Index 3" style="display:block; margin: 10px auto; max-width: 100%;">
                <p style="text-align: center; color: #ccc; font-size: 0.9rem; margin-top: 5px;">Figure: Step 3 - Target Found</p>
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">2. KMP Algorithm (Knuth–Morris–Pratt)</h2>
            <div class="modal-text">
                <strong>Purpose:</strong> Enemy signal pattern detection.
            </div>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Text:
"ABABACABABACABABAC"
Pattern:
"ABABAC"

LPS Array:
[0, 0, 1, 2, 3, 0]

Output:
Pattern found at indices:
0, 6, 12
            </div>
        </div>

        <div class="modal-algo-block">
            <h2 class="modal-algo-title">3. Rabin–Karp Algorithm</h2>
            <div class="modal-text">
                <strong>Purpose:</strong> Hash-based threat code detection.
            </div>
             <h3 class="modal-section-title">Algorithm Summary</h3>
             <ul class="modal-text" style="padding-left: 20px;">
                <li>Compute hash of pattern.</li>
                <li>Compare with rolling hash of text windows.</li>
                <li>Verify on hash match.</li>
            </ul>
            <h3 class="modal-section-title">Example Input/Output</h3>
            <div class="modal-code-block">
Input:
Text:
"COMMANDATTACKNOWATTACK"
Pattern:
"ATTACK"
Prime = 101

Output:
Pattern found at index 7
Pattern found at index 16

Note:
Hash collision handled safely.
            </div>
        </div>
    `
};

function openModal(memberId) {
    const modal = document.getElementById('algoModal');
    const modalBody = document.getElementById('modalBody');

    if (ALGO_DETAILS[memberId]) {
        modalBody.innerHTML = ALGO_DETAILS[memberId];
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
}

function closeModal() {
    const modal = document.getElementById('algoModal');
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('algoModal');
    if (event.target == modal) {
        closeModal();
    }
}