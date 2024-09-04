const gridContainer = document.querySelector("#grid-container");
const initialGridCount = 256;
let isDrawing = false;

// Function to create a square grid in grid container. gridCount arg is total area.
function createGrid(gridCount)
{
    
    for (let i = 0; i < gridCount; i++)
        {
            const dimensionLength = Math.sqrt(gridCount);
            const div = document.createElement("div");

            // Sets style of each drawable grid
            div.style.backgroundColor = "black";
            div.style.opacity = "0";
            div.classList.add("drawable");
            div.style.width = String(gridContainer.offsetWidth/dimensionLength) + "px";
            div.style.height = String(gridContainer.offsetHeight/dimensionLength) + "px";

            //console.log(gridContainer.offsetWidth);
            //console.log(gridContainer.offsetHeight);
            gridContainer.appendChild(div);
        }
    setUpGridEvents();
}

// Fills in a grid with a color to simulate drawing
function fillGrid(grid)
{
    if (isDrawing)
    {
        // Increase grid opacity by 10% each time it is drawn on
        const opacityIncrease = 0.1;
        grid.style.opacity = String(Number(grid.style.opacity) + opacityIncrease);
    }
}

// Adds hover event to all drawable grids
function setUpGridEvents()
{
    const grids = document.querySelectorAll(".drawable");
    grids.forEach((grid)=>
    {
        grid.addEventListener("mouseover", ()=>
        {
            //console.log("hovered");
            fillGrid(grid);
        });
    });
}


function enableDraw()
{
    const drawButton = document.querySelector("#draw");
    drawButton.addEventListener("click", ()=>
    {
        if (isDrawing)
        {
            isDrawing = false;
        }
        else
        {
            isDrawing = true;
        }
    });
}


function clearGrids()
{
    const drawableGrids = document.querySelectorAll(".drawable");
    drawableGrids.forEach((grid)=>
    {
        gridContainer.removeChild(grid);
    })
}


function addNewGridEvent()
{
    const newGridButton = document.querySelector("#new-grid");
    newGridButton.addEventListener("click", ()=>
    {
        let promptAnswered = false;
        let userInput;
        while (promptAnswered == false)
        {
            userInput = prompt("Enter dimension for a new grid (1-100)");
            if (Number(userInput) >= 1 && Number(userInput) <= 100)
            {
                promptAnswered = true;
                clearGrids();
                createGrid(Math.pow(userInput, 2));
            }
            else if (userInput == null)
            {
                console.log("canceled");
                return;
            }
        }
    });
}

enableDraw();
addNewGridEvent();
createGrid(initialGridCount);
