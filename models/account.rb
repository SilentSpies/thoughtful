class Account < ActiveRecord::Base
  # DB relationship
  has_many :items

  include BCrypt



  # push the encrpted password (BCrypt) to the table
  def password=(pwd)
    self.password_digest = BCrypt::Password.create(pwd)
  end



  # Return password
  def password
    BCrypt::Password.new(self.password_digest)
  end



  # authenticate user info
  def self.authenticate(user_name, password)
    # find the user
    current_user = Account.find_by(user_name: user_name)
    # return the user object if the passwords match
    # if a user name not in the DB is sent, current_user.password returns
    # an error! check it first and short the IF
    if (current_user.password == password)
      return current_user
    else
      return nil
    end
  end

end # END CLASS
