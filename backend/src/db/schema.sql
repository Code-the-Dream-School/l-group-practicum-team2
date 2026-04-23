CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role DEFAULT 'USER' NOT NULL,
  location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TYPE species AS ENUM ('Dog', 'Cat', 'Rabbit');
CREATE TYPE age_category AS ENUM ('Young', 'Adult', 'Senior');
CREATE TYPE animal_size AS ENUM ('Small', 'Medium', 'Large');
CREATE TYPE animal_status AS ENUM ('Available', 'Adopted');

CREATE TABLE IF NOT EXISTS animals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  shelter_id UUID NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  age_years FLOAT,
  age_category age_category,
  size animal_size,

  special_needs BOOLEAN DEFAULT FALSE,
  temperament TEXT,
  description TEXT,

  photo_url TEXT,

  status animal_status DEFAULT 'Available',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (user_id, animal_id)
);

CREATE TYPE message_status AS ENUM ('SENT', 'PROCESSING', 'CLOSED');
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  message TEXT  NOT NULL,
  status message_status DEFAULT 'SENT',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);