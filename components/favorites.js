'use client'
// components/Favorites.js
import React from 'react';

const Favorites = ({ contacts, favorites, toggleFavorite }) => {
  return (
    <div>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favoriteId) => {
            const contact = contacts.find((c) => c.id === favoriteId);
            return (
              <li key={favoriteId}>
                {contact ? contact.name : 'Unknown Contact'}
                <button onClick={() => toggleFavorite(favoriteId)}>Remove from Favorites</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default Favorites;
