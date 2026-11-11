'use client';
import { useState } from 'react';
import { supabase } from '../supabase'; // यहाँ से एक '../' हटा दिया है

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Supabase डेटाबेस में मूवी सेव करने का कोड
    const { error } = await supabase
      .from('movies')
      .insert([{ title, description, video_url: videoUrl, thumbnail }]);

    setLoading(false);

    if (error) {
      setMessage('❌ Error: ' + error.message);
    } else {
      setMessage('✅ मूवी सफलतापूर्वक लाइव हो गई है!');
      // फॉर्म खाली करने के लिए
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnail('');
    }
  };

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
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#1f2937',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#ef4444',
            marginBottom: '20px',
          }}
        >
          🎬 Admin Panel - Add Movie
        </h1>

        {message && (
          <div
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              backgroundColor: message.includes('Error')
                ? '#7f1d1d'
                : '#064e3b',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleAddMovie}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '0.9rem',
              }}
            >
              Movie Title (मूवी का नाम)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="जैसे: KGF Chapter 2"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#374151',
                color: '#fff',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '0.9rem',
              }}
            >
              Thumbnail Image URL (पोस्टर लिंक)
            </label>
            <input
              type="url"
              required
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://example.com"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#374151',
                color: '#fff',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '0.9rem',
              }}
            >
              Video URL (.mp4 डायरेक्ट लिंक)
            </label>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://cloudinary.com"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#374151',
                color: '#fff',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '0.9rem',
              }}
            >
              Description (मूवी के बारे में)
            </label>
            <textarea
              required
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="मूवी की कहानी यहाँ लिखें..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#374151',
                color: '#fff',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#dc2626',
              color: '#fff',
              padding: '12px',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            {loading ? 'Uploading...' : '🚀 Publish Movie Live'}
          </button>
        </form>
      </div>
    </main>
  );
}
