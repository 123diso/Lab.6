export const globalStyles = `
  :host {
    font-family: 'Segoe UI', sans-serif;
    display: block;
    background: #e4f0fb;
    min-height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
  }

  .container {
    background: #fff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    max-width: 500px;
    margin: 1rem auto;
  }

  h1, h2, h3 {
    text-align: center;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input, select {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }

  button {
    background: #3a91f5;
    color: white;
    padding: 0.75rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #3a91f5;
  }

  ul {
    padding-left: 1rem;
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.5rem;
  }
    .arrow-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.arrow-icon {
    transform: rotate(90deg);
}

@keyframes bounce {
    0%, 100% { transform: translateY(0) rotate(90deg); }
    50% { transform: translateY(5px) rotate(90deg); }
}
`;
