package com.gs2.pipeline.dto;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.gs2.pipeline.domain.Idea;

public class IdeaDistributionTtmProfitVoteDto {
		
		private static final String[] dimensionsNamesArray = {"ttm","profit","votes","tag"};
	
		/**
		 * The names of the axis in order
		 * 
		 * It should be interpreted by the graph visualizer
		 * 
		 * e.g. in case of Bubble Graph it enumerates
		 * 	horizontal axis :  Implementation Months - expected ttm
		 *  vertical axis : profit range : expected profit
		 *  size : votes
		 *  color (type) : first tag
		 *  
		 * 
		 */
		List<String> dimesionNames;
		/**
		 * List of graphical elements
		 * Each graphical element has the values for the graphic and the list of related ideas
		 */
		List<TtmProfitVoteDto> items;
		/**
		 * Parameters that generated this report
		 */
		GetIdeasDto parameters;
		/**
		 * Date at the moment the report was asked
		 */
		Date date;

		
		
		public IdeaDistributionTtmProfitVoteDto(List<IdeaDto> ideas,GetIdeasDto parameters) {
			this.dimesionNames = Arrays.asList(dimensionsNamesArray);			
			this.date=new Date();
			this.parameters = parameters;
			this.items = ideas.stream().map(TtmProfitVoteDto::create).collect(Collectors.toList());
		}



		public List<String> getDimesionNames() {
			return dimesionNames;
		}



		public void setDimesionNames(List<String> dimesionNames) {
			this.dimesionNames = dimesionNames;
		}



		public List<TtmProfitVoteDto> getItems() {
			return items;
		}



		public void setItems(List<TtmProfitVoteDto> items) {
			this.items = items;
		}



		public GetIdeasDto getParameters() {
			return parameters;
		}



		public void setParameters(GetIdeasDto parameters) {
			this.parameters = parameters;
		}



		public Date getDate() {
			return date;
		}



		public void setDate(Date date) {
			this.date = date;
		}



		public static String[] getDimensionsnamesarray() {
			return dimensionsNamesArray;
		}
		
		
		
}
