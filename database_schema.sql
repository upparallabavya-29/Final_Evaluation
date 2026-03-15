CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    balance NUMERIC DEFAULT 10000,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),
    amount NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own balance" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can view their own transactions" ON transactions FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
