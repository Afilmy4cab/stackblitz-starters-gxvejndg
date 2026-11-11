'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from './supabase';

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching movies:', error);
    } else {
      setMovies(data || []);
    }
    setLoading(false);
  }

  return (
    <main
      style={{
        padding: '20px',
        backgroundColor: '#111827',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto 30px auto',
        }}
      >
        <h1 style={{ color: '#ef4444', fontSize: '1.8rem', margin: 0 }}>
          🍿 FilmyDub
        </h1>
        <Link
          href="/admin"
          style={{
            backgroundColor: '#374151',
            color: '#fff',
            padding: '8px 15px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}
        >
          + Add Movie
        </Link>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '50px' }}>
          Loading movies...
        </p>
      ) : movies.length === 0 ? (
        <div
          style={{ textAlign: 'center', color: '#9ca3af', marginTop: '50px' }}
        >
          <p>अभी कोई मूवी नहीं है।</p>
          <Link
            href="/admin"
            style={{ color: '#ef4444', textDecoration: 'underline' }}
          >
            Admin Panel से पहली मूवी जोड़ें
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h2 style={{ fontSize: '1.2rem', margin: '0 0 10px 0' }}>
                  {movie.title}
                </h2>
                <p
                  style={{
                    color: '#9ca3af',
                    fontSize: '0.9rem',
                    height: '40px',
                    overflow: 'hidden',
                    marginBottom: '15px',
                  }}
                >
                  {movie.description}
                </p>
                <Link
                  href={`/watch/${movie.id}`}
                  style={{
                    display: 'block',
                    backgroundColor: '#dc2626',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '10px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  ▶ Watch Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
