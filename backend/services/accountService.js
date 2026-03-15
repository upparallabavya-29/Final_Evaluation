import { supabase } from '../config/supabaseClient.js';

class AccountService {
    async getBalance(userId) {
        const { data, error } = await supabase
            .from('users')
            .select('balance')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data.balance;
    }

    async getStatement(userId) {
        const { data, error } = await supabase
            .from('transactions')
            .select(`
                *,
                sender:sender_id(name),
                receiver:receiver_id(name)
            `)
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map((t) => {
            const isSender = t.sender_id === userId;
            return {
                ...t,
                type: isSender ? 'Debit' : 'Credit',
                displayPartner: isSender ? t.receiver?.name : t.sender?.name,
            };
        });
    }

    async transferMoney(senderId, receiverEmail, amount) {
        // Use the RPC for atomicity
        const { data, error } = await supabase.rpc('transfer_funds', {
            p_sender_id: senderId,
            p_receiver_email: receiverEmail,
            p_amount: amount
        });

        if (error) throw error;
        if (!data.success) throw new Error(data.message);

        return data;
    }

    async getAllUsers(excludeId) {
        const { data, error } = await supabase
            .from('users')
            .select('id, name, email')
            .neq('id', excludeId);

        if (error) throw error;
        return data;
    }
}

export default new AccountService();
