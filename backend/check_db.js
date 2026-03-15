import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfhndekqjrarkyoeqbyu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maG5kZWtxanJhcmt5b2VxYnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NTkxMDYsImV4cCI6MjA4OTEzNTEwNn0.GSTTp0XxG5IYWE79FMvpM_0UoJOPyav2Yl_QzcJlbjo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    console.log('Checking transactions...');
    const { data: trans, error: transError } = await supabase.from('transactions').select('*');
    console.log('Transactions:', trans, 'Error:', transError);

    console.log('Checking users...');
    const { data: users, error: userError } = await supabase.from('users').select('id, email, name');
    console.log('Users:', users, 'Error:', userError);
}

checkData();
