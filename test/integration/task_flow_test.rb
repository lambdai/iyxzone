require 'test_helper'
require(File.join(File.dirname(__FILE__), 'login_mod'))

class TaskFlowTest < ActionController::IntegrationTest
  
  include LoginMod

  def setup

  end
=begin
  test "Task Create" do
    t1 = TaskFactory.create
    assert_equal t1.description[:title], "task_1"
    t2 = TaskFactory.create
    assert_equal t2.description[:title], "task_2"
  end

  test "meta-prerequisite" do
    t1 = TaskFactory.create(:prerequisite => {:character_more_than => 1})
    user = UserFactory.create
    character1   = GameCharacterFactory.create(:user_id => user.id)
    user.reload
    assert_equal 1, user.characters_count
    assert !(t1.is_selectable_by? user)
    character2   = GameCharacterFactory.create(:user_id => user.id)
    user.reload
    assert t1.is_selectable_by? user
  end
=end

  test "character task" do
    $stderr.puts "--"*20
    t1 = TaskFactory.create(:prerequisite => {:character_more_than => 1 }, :requirement => {:character_more_than => 2})
    user = UserFactory.create
    character1   = GameCharacterFactory.create(:user_id => user.id)
    user.reload
    assert_equal 1, user.characters_count
    assert !(t1.is_selectable_by? user)
    character2   = GameCharacterFactory.create(:user_id => user.id)
    user.reload
    t1.reload
    assert !(t1.select_this user).new_record?
    user.reload
    assert_equal 2, user.characters_count
    character3   = GameCharacterFactory.create(:user_id => user.id)
    user.reload
    assert_equal 3, user.characters_count
#    $stderr.puts user.user_tasks.first.achievement.inspect
    t1.reload
    assert t1.completed_by? user
  end
=begin
  test "blog task" do
    t = TaskFactory.create
    user = UserFactory.create
    ut = t.select_this user
    assert !ut.new_record?, "a user_task should be created here"
    assert !ut.is_complete?, "a new created user can't get reward"
    user.reload
    BlogFactory.create(:poster_id  => user.id)
    assert ut.is_complete? , "user should complete the simple task"    
  end
=end
end
