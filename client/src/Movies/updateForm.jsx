import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateForm(props) {
	const { id } = props.match.params;
	const defaultMovie = {
		id: '',
		title: '',
		director: '',
		metaScore: '',
		stars: []
	};
	const [movie, setMovie] = useState(defaultMovie);
	useEffect(() => {
		axios.get(`http://localhost:5000/api/movies/${id}`).then(resp => {
			setMovie(resp.data);
		});
	}, [id]);

	const handleChange = e => {
		setMovie({ ...movie, [e.target.name]: e.target.value });
	};

	const handleStars = e => {
		setMovie({
			...movie,
			stars: [e.target.value]
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then(resp => {
				setMovie(defaultMovie);
				props.history.push('/');
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<input
					placeholder='title'
					name='title'
					value={movie.title}
					onChange={handleChange}
				/>
				<input
					placeholder='director'
					name='director'
					value={movie.director}
					onChange={handleChange}
				/>
				<input
					placeholder='meta score'
					name='metaScore'
					value={movie.metaScore}
					onChange={handleChange}
				/>
				<input
					placeholder='stars'
					name='stars'
					value={movie.stars}
					onChange={handleChange}
				/>
				<button type='submit'>Update</button>
			</form>
		</div>
	);
}
