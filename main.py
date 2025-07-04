from grid import Grid

def main():
    grid = Grid(5, 5)
    # Initialize the grid with some live cells
    # grid.set_cell(2, 3, True)
    # grid.set_cell(3, 2, True)
    # grid.set_cell(4, 4, True)
    # grid.set_cell(4, 2, True)
    # grid.set_cell(2, 1, True)
    # grid.set_cell(1, 2, True)
    grid.set_cell(1, 0, True)
    grid.set_cell(0, 0, True)
    grid.set_cell(0, 1, True)

    # Print the initial state
    print("Initial State:")
    grid.pretty_print()

    # Update the grid for a number of generations
    for _ in range(5):
        grid.update()
        print("Next Generation:")
        grid.pretty_print()

if __name__ == "__main__":
    main()
