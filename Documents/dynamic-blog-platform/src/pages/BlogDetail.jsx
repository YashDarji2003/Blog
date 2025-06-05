import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.css';

const blogs = [
  {
    id: 1,
    title: 'Vacation Rental Trends: What’s Hot This Year',
    date: 'May 24, 2024',
    image: '/blog1.png',
    content: `From themed interiors to pet-friendly stays, vacation rentals are getting a major upgrade. In 2024, we’re seeing a shift towards remote work-ready homes, smart-tech enabled apartments, and quirky local experiences. Whether you’re a host or a guest, staying ahead of trends can make or break your rental experience. This article explores what’s hot — and what’s not — in today’s vacation housing space.`,
  },
  {
    id: 2,
    title: 'Your Ultimate Guide to Renting a Flat Hassle-Free',
    date: 'May 18, 2024',
    image: '/blog2.png',
    content: `Renting a new place doesn’t have to be a headache. This guide covers everything from verifying documentation and inspecting plumbing to negotiating lease terms and understanding your rights. Whether it’s your first flat or your fifth, our tips will help you avoid last-minute surprises and settle into your new space with confidence.`,
  },
  {
    id: 3,
    title: 'Rental Agreements Demystified: What You Must Check Before Signing',
    date: 'May 14, 2024',
    image: '/blog3.png',
    content: `Most renters skim over their lease agreements — and that’s where the trouble begins. This post breaks down the fine print in simple language: lock-in periods, security deposits, notice clauses, and repair responsibilities. We also explain what’s legally binding and what’s negotiable. Trust us, a few minutes of reading can save you weeks of stress later.`,
  },
  {
    id: 4,
    title: 'First-Time Renters: Avoid These Rookie Mistakes',
    date: 'May 5, 2024',
    image: '/blog4.png',
    content: `You finally found your dream flat — but did you forget to check water pressure? Or read reviews about the landlord? This article lists out common mistakes made by new renters: overlooking hidden costs, underestimating commute time, ignoring neighborhood safety. We also offer hacks to manage deposits, utilities, and shifting timelines. Read this before your next site visit.`,
  },
  {
    id: 5,
    title: 'Unlocking Doors: Internship Opportunities at To-Let Globe',
    date: 'April 15, 2024',
    image: '/blog5.png',
    content: `At To-Let Globe, we believe in nurturing talent from the ground up. Our internship program is designed to provide hands-on experience across departments — from digital marketing and content to property research and client services. Interns aren’t just observers; they’re contributors to live projects that shape how we connect people with homes. We offer mentorship, learning workshops, and performance-based recognition. Many of our interns go on to secure full-time roles or use their experiences as springboards to larger opportunities. It’s more than work — it’s a launchpad for your real estate career.`,
  },
  {
    id: 6,
    title: 'Life at To-Let Globe: Our Culture, Stories & Everyday Wins',
    date: 'April 9, 2024',
    image: '/blog6.png',
    content: `Behind every property listed and every blog post published is a passionate team working together with one shared vision. Life at To-Let Globe is energetic, fast-paced, and full of learning. We celebrate small wins, team milestones, and even birthdays together. Our internal Slack is a blend of serious business and cat memes, and the pantry’s always stocked (coffee, of course!). Whether it's Monday motivation or Friday team trivia, our culture thrives on trust, transparency, and teamwork. That’s what makes coming to work feel like coming home.`,
  },
  {
    id: 7,
    title: 'Big Moves: Brands We’ve Partnered With This Year',
    date: 'March 26, 2024',
    image: '/blog7.png',
    content: `2024 has been a landmark year for us in terms of partnerships. From co-branded campaigns with top furniture rental companies to strategic alliances with home loan consultancies, our goal remains the same — to add value to our users. We've collaborated with property tech platforms, legal advisors, and even local artists to bring more than just listings to our site. These partnerships are built on trust, mutual growth, and customer-first thinking. The result? A richer experience for renters, buyers, and investors alike.`,
  },
  {
    id: 8,
    title: 'Faces of the Brand: Meet the People Behind the Platform',
    date: 'March 12, 2024',
    image: '/blog8.png',
    content: `What makes a tech-driven rental platform truly human? Its people. Our team is a colorful mix of backgrounds and passions — content writers who are part-time poets, designers obsessed with pixel-perfect layouts, and backend devs who swear by dark mode. In this edition, we sit down with some of them to learn their stories, challenges, and what they love most about working here. It’s a celebration of individuality within a collaborative spirit, and a reminder that real estate isn’t just about property — it’s about people.`,
  },
  {
    id: 9,
    title: 'Property Spotlight: Featured Listings That Stole the Show',
    date: 'February 28, 2024',
    image: '/blog9.png',
    content: `This month’s featured listings include a 2BHK near Lucknow’s business district that racked up over 10,000 views in 3 days, and a charming studio flat in Indira Nagar that had three offers within hours. From airy balconies to vintage tiles and smart lighting, renters are looking for spaces that blend function with flair. Our property listing team ensures every upload is accurate, visually appealing, and keyword-optimized — helping renters find homes faster, and owners close deals smarter. Stay tuned for our next curation drop!`,
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) return <p className="text-white p-5">Blog not found.</p>;

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-header">
        <img src={blog.image} alt={blog.title} className="blog-detail-img" />
        <h2>{blog.title}</h2>
        <p className="blog-date">{blog.date}</p>
      </div>
      <div className="blog-detail-content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
