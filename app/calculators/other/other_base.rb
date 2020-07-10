require 'matrix'

class OtherBase

  attr_reader :is_valid
  def initialize(a, b)
    @mat_a = Matrix[*a].map(&:to_f)
    @mat_b = Vector[*b].map(&:to_f)
    @n = @mat_a.column_size
  end

  def calculate(mat)
  end

  def core
  end

  def run
    validate

    unless @is_valid
      return Vector[]
    end

    self.core

    @mat_b
  end

  def is_square_matrix(mat)
    mat.column_size == mat.row_size
  end

  def validate
    @is_valid = true
    if (!is_square_matrix(@mat_a)) or (@mat_a.row_size != @mat_b.size)
      @is_valid = false
    end
  end
end