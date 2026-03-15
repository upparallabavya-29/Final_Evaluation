-- Run this SQL in Supabase SQL Editor to handle atomic transfers
-- It ensures both balance updates and transaction logging happen together or not at all.

CREATE OR REPLACE FUNCTION transfer_funds(
  p_sender_id UUID,
  p_receiver_email TEXT,
  p_amount NUMERIC
) RETURNS JSON AS $$
DECLARE
  v_receiver_id UUID;
  v_sender_balance NUMERIC;
BEGIN
  -- 1. Get and Lock Sender Balance
  SELECT balance INTO v_sender_balance FROM users WHERE id = p_sender_id FOR UPDATE;
  
  IF v_sender_balance < p_amount THEN
    RETURN json_build_object('success', false, 'message', 'Insufficient balance');
  END IF;

  -- 2. Get Receiver ID
  SELECT id INTO v_receiver_id FROM users WHERE email = p_receiver_email;
  
  IF v_receiver_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Receiver not found');
  END IF;

  IF v_receiver_id = p_sender_id THEN
    RETURN json_build_object('success', false, 'message', 'Cannot transfer to yourself');
  END IF;

  -- 3. Update Balances
  UPDATE users SET balance = balance - p_amount WHERE id = p_sender_id;
  UPDATE users SET balance = balance + p_amount WHERE id = v_receiver_id;

  -- 4. Log Transaction
  INSERT INTO transactions (sender_id, receiver_id, amount) 
  VALUES (p_sender_id, v_receiver_id, p_amount);

  RETURN json_build_object('success', true, 'message', 'Transfer successful', 'new_balance', v_sender_balance - p_amount);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
