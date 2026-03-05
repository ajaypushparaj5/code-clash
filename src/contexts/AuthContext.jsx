import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) {
            setProfile(data);
        } else if (error && error.code === 'PGRST116') {
            // Profile doesn't exist, create it (should theoretically be handled by a trigger, but let's be safe)
            const { data: newProfile } = await supabase
                .from('users')
                .insert([{ id: userId, xp: 0, level: 'Beginner' }])
                .select()
                .single();
            if (newProfile) setProfile(newProfile);
        }
    };

    useEffect(() => {
        // Initial sesión check
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) fetchProfile(currentUser.id);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                fetchProfile(currentUser.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signUp = (email, password) => supabase.auth.signUp({ email, password });
    const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
    const signOut = () => supabase.auth.signOut();

    const allotXP = async (amount) => {
        if (!user || !profile) return;

        const newXP = profile.xp + amount;
        // Simple leveling logic
        let newLevel = 'Beginner';
        if (newXP > 1000) newLevel = 'Code Master';
        else if (newXP > 500) newLevel = 'Optimizer';
        else if (newXP > 200) newLevel = 'Debugger';

        const { data, error } = await supabase
            .from('users')
            .update({ xp: newXP, level: newLevel })
            .eq('id', user.id)
            .select()
            .single();

        if (data) setProfile(data);
        return { data, error };
    };

    return (
        <AuthContext.Provider value={{ user, profile, signUp, signIn, signOut, allotXP, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
