CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- reusable trigger function
CREATE OR REPLACE FUNCTION set_updated_at() 
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN 
  NEW.updated_at = CURRENT_TIMESTAMP; 
  RETURN NEW; 
END; 
$$;

-- create USERS table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'USER');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role DEFAULT 'USER' NOT NULL,
  location TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS trigger_users_updated_at ON users;

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE
ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();



-- create SHELTERS table
CREATE TABLE IF NOT EXISTS shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS trigger_shelters_updated_at ON shelters;

CREATE TRIGGER trigger_shelters_updated_at
BEFORE UPDATE ON shelters
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- create ANIMALS table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'age_category') THEN
    CREATE TYPE age_category AS ENUM ('YOUNG', 'ADULT', 'SENIOR');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'animal_size') THEN
    CREATE TYPE animal_size AS ENUM ('SMALL', 'MEDIUM', 'LARGE');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'animal_status') THEN
    CREATE TYPE animal_status AS ENUM ('AVAILABLE', 'ADOPTED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS animals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shelter_id UUID NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  age_years FLOAT CHECK (age_years >= 0 AND age_years <= 30),
  age_category age_category,
  size animal_size,
  special_needs BOOLEAN DEFAULT FALSE,
  temperament TEXT,
  description TEXT,
  photo_url TEXT,
  status animal_status DEFAULT 'AVAILABLE',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS trigger_animals_updated_at ON animals;


CREATE TRIGGER trigger_animals_updated_at
BEFORE UPDATE ON animals
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_animals_shelter_id ON animals(shelter_id);
CREATE INDEX IF NOT EXISTS idx_animals_status ON animals(status);

-- for featured animals on home page
-- SELECT * FROM animals WHERE special_needs = TRUE AND status = 'AVAILABLE';
CREATE INDEX idx_animals_special_available
ON animals(special_needs, status)
WHERE special_needs = TRUE AND status = 'AVAILABLE';


-- create FAVORITES table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (user_id, animal_id)
);

DROP TRIGGER IF EXISTS trigger_favorites_updated_at ON favorites;

CREATE TRIGGER trigger_favorites_updated_at
BEFORE UPDATE ON favorites
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_animal_id ON favorites(animal_id);


-- create INQUIRIES table

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_status') THEN
    CREATE TYPE message_status AS ENUM ('SENT', 'PROCESSING', 'CLOSED');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  message TEXT  NOT NULL,
  status message_status DEFAULT 'SENT',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS trigger_inquiries_updated_at ON inquiries;

CREATE TRIGGER trigger_inquiries_updated_at
BEFORE UPDATE ON inquiries
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_animal_id ON inquiries(animal_id);
