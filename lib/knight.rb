class Knight
	attr_accessor :moveset, :x_position, :y_position, :valid_moves

	def initialize(position)
		@moveset = [
			[-1,-2],
			[-2,-1],
			[-2,+1],
			[-1,+2],
			[+1,-2],
			[+2,-1],
			[+2,+1],
			[+1,+2]
		]
		@x_position = position[0]
		@y_position = position[1]
		@valid_moves = get_valid_moves
	end

	def get_valid_moves
		valid_moves = []

		@moveset.each do |move|
			x = @x_position + move[0]
			y = @y_position + move[1]

      valid_moves << [x, y] if ((0..7).include?(x) && (0..7).include?(y))
    end

		valid_moves
	end
end
