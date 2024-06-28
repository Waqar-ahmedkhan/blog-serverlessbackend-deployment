import { useEffect, useState } from 'react';

const quotes = [
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
  },
  {
    text: "Technology is best when it brings people together.",
    author: "Matt Mullenweg"
  },
  {
    text: "It's not about ideas. It's about making ideas happen.",
    author: "Scott Belsky"
  },
  {
    text: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.",
    author: "Bill Gates"
  },
  {
    text: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke"
  },
  {
    text: "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past.",
    author: "Tim Berners-Lee"
  },
  {
    text: "The science of today is the technology of tomorrow.",
    author: "Edward Teller"
  }
];

const Quote = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="h-screen bg-zinc-200 flex justify-center items-center">
      <div className="max-w-2xl mx-auto p-10   bg-zinc-200 rounded-lg  transition-all duration-300 hover:shadow-lg">
        <blockquote className="text-center  bg-zinc-200 ">
          <p className="text-3xl font-light mb-6 text-gray-800 leading-relaxed">"{quote.text}"</p>
          <footer className="text-xl font-medium text-gray-600">- {quote.author}</footer>
        </blockquote>
      </div>
    </div>
  );
}

export default Quote;