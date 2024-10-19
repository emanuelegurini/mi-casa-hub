"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import YouTube, { YouTubeProps } from 'react-youtube';
import { createClient } from '@/utils/supabase/client';

const YouTubePlayer = ({ id }: { id: string}) => {
	const [showVideoDialog, setShowVideoDialog] = React.useState(false);

	const supabase = createClient();

	React.useEffect(() => {
		const fetchVideoId = async () => {
			const { data, error } = await supabase
				.from('properties')
				.select('videoId')
				.eq('id', id)
				.single();

			if (error) {
				console.error('Error fetching videoId:', error);
			} else {
				setVideoId(data.videoId);
			}
		};

		fetchVideoId();
	}, []);

	const [videoId, setVideoId] = React.useState<string | null>(null);

	const opts: YouTubeProps['opts'] = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1,
		},
	};

	const onReady: YouTubeProps['onReady'] = (event) => {

		event.target.pauseVideo();
	};

	return (
		<>
			<Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
				<DialogTrigger asChild>
					<Button>
						Show Video
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[700px]">
					<DialogHeader>
						<DialogTitle>Video</DialogTitle>
						<DialogDescription>
							Here is the video you requested.
						</DialogDescription>
					</DialogHeader>
					{videoId ? ( <div className="h-[390px] w-[640px]">
							<YouTube videoId={videoId} opts={opts} onReady={onReady} />
					</div>) : (
							<p>Non è stato ancora caricato nessun video nel portale.</p>
						)}
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Close</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default YouTubePlayer;