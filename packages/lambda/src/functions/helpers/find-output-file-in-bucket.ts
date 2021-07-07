import {_Object} from '@aws-sdk/client-s3';
import {getAwsRegion} from '../../cli/get-aws-region';
import {outName, RenderMetadata} from '../../shared/constants';

export const findOutputFileInBucket = ({
	contents,
	renderMetadata,
	bucketName,
	renderId,
}: {
	contents: _Object[];
	renderMetadata: RenderMetadata | null;
	bucketName: string;
	renderId: string;
}): {
	url: string;
	size: number;
	lastModified: number;
} | null => {
	const output = renderMetadata
		? contents.find((c) =>
				c.Key?.includes(outName(renderId, renderMetadata.codec))
		  ) ?? null
		: null;

	if (!output) {
		return null;
	}

	if (!renderMetadata) {
		throw new Error('unexpectedly did not get renderMetadata');
	}

	return {
		lastModified: output.LastModified?.getTime() as number,
		size: output.Size as number,
		url: `https://s3.${getAwsRegion()}.amazonaws.com/${bucketName}/${outName(
			renderId,
			renderMetadata.codec
		)}`,
	};
};