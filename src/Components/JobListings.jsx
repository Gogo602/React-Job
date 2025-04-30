import React from 'react'
import JobListing from './JobListing'
import { useState, useEffect } from 'react';
import Spinner from './Spinner';


const JobListings = ({isHome = false}) => {

    // const jobListings = isHome ? jobs.slice(0, 3) : jobs;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const isProduction = import.meta.env.MODE === 'production';
            const apiUrl = isProduction ? '/jobs.json' : '/jobs.json';
            console.log('Fetching from:', apiUrl);

            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
                const data = await res.json();
                 console.log('Data before setting jobs:', data);
                setJobs(data.jobs);
            } catch (error) {
                console.log('Error Fetching Data', error)
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    const jobListings = isHome ? jobs.slice(0, 3) : jobs;

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>
               
                    {loading ? (
                        <Spinner loading={loading} />
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {jobListings.map((job) => (
                            <JobListing key={job.id} job={job} />  
                        )) }
                        </div>
                    )}

            </div>
        </section>
    
  )
}

export default JobListings
