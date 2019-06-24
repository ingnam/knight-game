class MoveAssistantController < ApplicationController
  def index
    start_position = params[:start_position].map(&:to_i)
    end_position = params[:end_position].map(&:to_i)

    solution = []
    solution << start_position

    distance_info = Array.new(8) { Array.new(8) { { distance: nil, parent: nil } } }
    distance_info[end_position[0]][end_position[1]][:distance] = 0

    end_knight = Knight.new(end_position)
    queue = []
    queue << end_knight

    path_found = false

    until path_found
      position = queue.shift
      distance = 1

      position.valid_moves.each do |move|
        if move == start_position
          path_found = true
        end

        if distance_info[move[0]][move[1]][:distance] == nil
          distance_info[move[0]][move[1]][:distance] = distance_info[position.x_position][position.y_position][:distance] + 1
          distance_info[move[0]][move[1]][:parent] = position
          queue << Knight.new(move)
        end
      end
    end

    start_knight = Knight.new(start_position)

    smallest_distance = 63
    shortest_path = nil
    until shortest_path == end_position
      start_knight.valid_moves.each do |move|
        if distance_info[move[0]][move[1]][:distance] != nil && distance_info[move[0]][move[1]][:distance] < smallest_distance
          smallest_distance = distance_info[move[0]][move[1]][:distance]
          shortest_path = move
        end
      end
      solution << shortest_path
      start_knight = Knight.new(shortest_path)
    end

    render json: { path: solution }, status: 200
  end
end
