
from cell import Cell


class Grid:
	"""A class representing the grid for the Game of Life."""
	def __init__(self, width: int, height: int):
		self.width = width
		self.height = height
		self.cells = [[Cell(False) for _ in range(width)] for _ in range(height)]

	def set_cell(self, x: int, y: int, value: bool):
		self.cells[y][x] = Cell(value)

	def get_cell(self, x: int, y: int) -> bool:
		return self.cells[y][x].value
	
	def update(self):
		new_cells = [[Cell(False) for _ in range(self.width)] for _ in range(self.height)]
		for y in range(self.height):
			for x in range(self.width):
				live_neighbors = self.count_live_neighbors(x, y)
				if self.cells[y][x].value:  # Current cell is alive
					if live_neighbors < 2:
						new_cells[y][x] = Cell(False)  # Underpopulation
					elif live_neighbors in (2, 3):
						new_cells[y][x] = Cell(True)   # Just right
					else:
						new_cells[y][x] = Cell(False)  # Overpopulation
				else:  # Current cell is dead
					if live_neighbors == 3:
						new_cells[y][x] = Cell(True)   # Reproduction
		self.cells = new_cells
	
	def count_live_neighbors(self, x: int, y: int) -> int:
		range_x = range(max(0, x - 1), min(self.width, x + 2))
		range_y = range(max(0, y - 1), min(self.height, y + 2))
		count = 0
		for ny in range_y:
			for nx in range_x:
				if (nx, ny) != (x, y) and self.cells[ny][nx].value:
					count += 1
		return count

	def pretty_print(self) -> None:
		print('\n'.join(''.join('*' if cell.value else '-' for cell in row) for row in self.cells))
