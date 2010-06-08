require 'test_helper'

class TaskFlowTest < ActionController::IntegrationTest
  
  include LoginMod

  def setup

  end

  test "Task Create" do
    t1 = TaskFactory.create
    assert_equal t1.description.title, "task_1"
    t2 = TaskFactory.create
    assert_equal t2.description.title, "task_2"
  end

end
