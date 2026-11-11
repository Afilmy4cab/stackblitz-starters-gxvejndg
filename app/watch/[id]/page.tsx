'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '../../supabase';

export default function WatchPage() {
  const params = useParams();
  const id = params?.id;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  async function fetchMovieDetails() {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching movie:', error);
    } else {
      setMovie(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#111827',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <p>Loading video player...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#111827',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h2>Movie not found!</h2>
        <Link
          href="/"
          style={{
            color: '#ef4444',
            textDecoration: 'underline',
            marginTop: '10px',
          }}
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#111827',
        color: '#fff',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* होमपेज पर वापस जाने का बटन */}
        <Link
          href="/"
          style={{
            color: '#9ca3af',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '20px',
            fontSize: '1rem',
          }}
        >
          ← Back to Home
        </Link>

        {/* वीडियो प्लेयर */}
        <div
          style={{
            backgroundColor: '#000',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 10px 15px rgba(0,0,0,0.5)',
            width: '100%',
            aspectRatio: '16/9',
          }}
        >
          <video
            src={movie.video_url}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%' }}
            controlsList="nodownload"
          />
        </div>

        {/* मूवी का नाम और कहानी */}
        <h1
          style={{
            fontSize: '1.8rem',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          {movie.title}
        </h1>
        <p
          style={{
            backgroundColor: '#1f2937',
            padding: '15px',
            borderRadius: '8px',
            color: '#d1d5db',
            lineHeight: '1.5',
          }}
        >
          {movie.description}
        </p>
      </div>
    </main>
  );
}
